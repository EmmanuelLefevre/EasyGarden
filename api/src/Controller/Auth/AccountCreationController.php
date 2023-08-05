<?php

namespace App\Controller\Auth;

use App\Entity\User;
use App\DataPersister\UserDataPersister;
use App\Repository\UserRepository;
use App\Service\Mailing\AccountCreationEmailService;
use App\Validator\User\EmailValidator;
use App\Utility\Date\DateTimeConverter;
use App\Utility\Token\TokenGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class AccountCreationController extends AbstractController
{
    private $emailService;
    private $emailValidator;
    private $userDataPersister;
    private $userRepository;

    /**
     * AccountCreationController constructor.
     *
     * @param AccountCreationEmailService $emailService The service responsible for sending account creation emails.
     * @param EmailValidator $emailValidator The validator responsible for email validation.
     * @param UserDataPersister $userDataPersister The service responsible for persisting user data.
     * @param UserRepository $userRepository The repository responsible for retrieving User data.
     */
    public function __construct(AccountCreationEmailService $emailService,
                                EmailValidator $emailValidator,
                                UserDataPersister $userDataPersister,
                                UserRepository $userRepository)
    {
        $this->emailService = $emailService;
        $this->emailValidator = $emailValidator;
        $this->userDataPersister = $userDataPersister;
        $this->userRepository = $userRepository;
    }

    /**
     * Create user account
     * This method is accessible via POST request to "/account_creation"
     * @param string Request $request The HTTP request object. 
     * @return JsonResponse
     * @Route("/api/account_creation", name="account_creation", methods={"POST"})
     */
    public function accountCreation(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Check that all required data is present and is of the expected type
        $requiredFields = ['email', 'plainPassword', 'pseudo', 'lastName', 'firstName', 'phoneNumber'];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                return new JsonResponse(['message' => 'Missing or empty required fields'], Response::HTTP_BAD_REQUEST);
            }
        }

        // Validate the email using EmailValidator
        $paramName = $data['email'];
        $isValid = $this->emailValidator->isValidEmail($paramName, true, null);
        if ($isValid !== true) {
            // Return JsonResponse on validation failure
            return $isValid;
        }

        // Check if a user with the provided email already exists
        $existingUser = $this->userRepository->findByEmail($data['email']);
        if ($existingUser) {
            return new JsonResponse(['message' => 'Email already exists'], Response::HTTP_CONFLICT);
        }

        // Create new user with the received JSON
        $user = new User();

        // User properties
        $user->setEmail($data['email']);
        $user->setPlainPassword($data['plainPassword']);
        $user->setPseudo($data['pseudo']);
        $user->setLastName($data['lastName']);
        $user->setFirstName($data['firstName']);
        $user->setPhoneNumber($data['phoneNumber']);
        $user->setRoles(['ROLE_USER']);
        $user->setIsVerified(false);

        // Convert DateTime string to DateTimeImmutable object using DateTimeConverter class
        $createdAt = DateTimeConverter::convertDateTimeStringToDateTimeImmutable();
        $user->setCreatedAt($createdAt);

        // Generate and set the activation token for the user using the TokenGenerator class
        $activationToken = TokenGenerator::generateToken();
        $user->setActivationToken($activationToken);

        // Send the account creation confirmation email with token activation link
        try {
            $this->emailService->sendActivationEmail($user, $user->getEmail(), $activationToken);
        } catch (\Exception $e) {
            return new JsonResponse(['message' => 'Failed to send email!'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
        // Persist User
        $this->userDataPersister->persist($user);

        // Return a success response
        return new JsonResponse(['message' => 'Created Account!'], Response::HTTP_CREATED);
    }

    /**
     * Activate user account
     * This method is accessible via GET request to "/account_activation/{token}" 
     * @param string $token The activation token received as part of the URL.
     * @return RedirectResponse A RedirectResponse object that redirects the user to the Angular verified account page.
     * @Route("/api/account_activation/{token}", name="account_activation", methods={"GET"})
     */
    public function activateAccount(string $token): RedirectResponse
    {

        // Check if token is not null and not an empty string
        if (!$token || !is_string($token)) {
            return new JsonResponse(['message' => 'Null or invalid activation token!'], Response::HTTP_FORBIDDEN);
        }
        // Find the user with the given activation token
        $user = $this->userRepository->findByActivationToken($token);

        if (!$user) {
            return new JsonResponse(['message' => 'Invalid activation token!'], Response::HTTP_FORBIDDEN);
        }

        // Activate the user's account
        $user->setIsVerified(true);
        
        // Convert DateTime string to DateTime object using DateTimeConverter class
        $updatedAt = DateTimeConverter::convertDateTimeStringToDate();
        $user->setUpdatedAt($updatedAt);

        // Clear the activation token
        $user->setActivationToken(null);

        // Persist account validation
        $this->userDataPersister->persist($user);

        // Redirect the user to the Angular verified account page (external URL)
        $loginUrl = 'http://localhost:4200/activated-account';
        return new RedirectResponse($loginUrl);
    }

}
