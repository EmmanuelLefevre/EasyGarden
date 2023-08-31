<?php

namespace App\Controller\Auth;

use App\Entity\User;
use App\DataPersister\UserDataPersister;
use App\Repository\UserRepository;
use App\Validator\User\EmailValidator;
use App\Service\Mailing\NewPasswordEmailService;
use App\Utility\Date\DateTimeConverter;
use App\Utility\Password\PasswordGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;


/**
 * Class ForgottenPasswordController
 * This controller handles user to generate a new account password.
 * It provides endpoint for generate a new account password.
 * @package App\Controller\Auth
 */
class ForgottenPasswordController extends AbstractController
{
    private $passwordService;
    private $emailValidator;
    private $userDataPersister;
    private $userPasswordHasher;
    private $userRepository;

    /**
     * ForgottenPasswordController constructor.
     * @param NewPasswordEmailService $passwordService The service responsible for sending new password email.
     * @param EmailValidator $emailValidator The validator responsible for email validation.
     * @param UserDataPersister $userDataPersister The service responsible for persisting user data.
     * @param UserPasswordHasherInterface $userPasswordHasher The UserPasswordHasherInterface instance used for hashing user passwords.
     * @param UserRepository $userRepository The repository responsible for retrieving User data.
     */
    public function __construct(NewPasswordEmailService $passwordService,
                                EmailValidator $emailValidator,
                                UserDataPersister $userDataPersister,
                                UserPasswordHasherInterface $userPasswordHasher,
                                UserRepository $userRepository)
    {
        $this->passwordService = $passwordService;
        $this->emailValidator = $emailValidator;
        $this->userDataPersister = $userDataPersister;
        $this->userPasswordHasher = $userPasswordHasher;
        $this->userRepository = $userRepository;
    }

    /**
    * Generate new user's password
    * This method is accessible via GET and POST request to "/forgotten_password/{email}" 
    * @param Request $request The HTTP request object.
    * @return RedirectResponse A RedirectResponse object that redirects the user to the Angular login page.
    * @Route("/api/forgotten_password/{email}", name="forgotten_password", methods={"GET","POST"})
    */
    public function generateNewPassword(Request $request): JsonResponse
    {

        $email = $request->query->get('email');
        $paramName = 'email'; 

        // Validate the email parameter using EmailValidator
        $validationResult = $this->emailValidator->isValidEmail($paramName, true, $request);
        if ($validationResult instanceof JsonResponse) {
            // Return JsonResponse instance on validation failure
            return $validationResult;
        }

        // Find the user with the given email
        $user = $this->userRepository->findByEmail($email);
        // No user found
        if (!$user) {
            return new JsonResponse(['message' => 'No existing email!'], Response::HTTP_FORBIDDEN);
        }
        // Account is not verified
        if (!$this->userRepository->isUserVerified($email)) {
            return new JsonResponse(['message' => 'No verified account!'], Response::HTTP_FORBIDDEN);
        }

        // If user found we generate a new password using PasswordGenerator class
        $newPassword = PasswordGenerator::generatePassword();
        // Hash the new password using the userPasswordHasher
        $hashedPassword = $this->userPasswordHasher->hashPassword($user, $newPassword);
        // Set new user's password
        $user->setPassword($hashedPassword);
        
        // Convert DateTime string to DateTime object using DateTimeConverter class
        $updatedAt = DateTimeConverter::convertDateTimeStringToDate();
        $user->setUpdatedAt($updatedAt);

        // Send the new password by email
        try {
            $this->passwordService->sendNewPasswordEmail($user, $user->getEmail(), $newPassword);
        } catch (\Exception $e) {
            return new JsonResponse(['message' => 'Failed to send email!'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        // Persist new password
        $this->userDataPersister->persist($user);

        // Return a success response
        return new JsonResponse(['message' => 'New password generated successfully!'], Response::HTTP_OK);
    }
}