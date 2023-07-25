<?php

namespace App\Controller;

use App\DataPersister\UserDataPersister;
use App\Entity\User;
use App\Service\AccountCreationEmailService;
use App\Utility\TokenGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\RouterInterface;

class AccountCreationController extends AbstractController
{
    private $userDataPersister;
    private $userPasswordHasher;
    private $emailService;

    public function __construct(UserDataPersister $userDataPersister, 
                                UserPasswordHasherInterface $userPasswordHasher, 
                                AccountCreationEmailService $emailService)
    {
        $this->userDataPersister = $userDataPersister;
        $this->userPasswordHasher = $userPasswordHasher;
        $this->emailService = $emailService;
    }

    /**
     * @Route("/account_creation", name="account_creation", methods={"POST"})
     */
    public function accountCreation(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

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
        $user->setCreatedAt(new \DateTimeImmutable());
        $user->setIsVerified(false);

        // Hash the plain password before persisting the user
        $hashedPassword = $this->userPasswordHasher->hashPassword($user, $user->getPlainPassword());
        $user->setPassword($hashedPassword);
        $user->eraseCredentials();

        // Generate and set the activation token for the user using the TokenGenerator class
        $activationToken = TokenGenerator::generateToken();
        $user->setActivationToken($activationToken);

        // Send the account creation confirmation email with token activation link
        try {
            $this->emailService->sendActivationEmail($user, $user->getEmail(), $activationToken);
        } catch (\Exception $e) {
            return new JsonResponse(['message' => 'Failed to send email'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
        // Persist User
        $this->userDataPersister->persist($user);

        // Return a success response
        return new JsonResponse(['status' => 201], Response::HTTP_CREATED);
    }


    /**
     * @Route("/account_activation/{token}", name="account_activation", methods={"GET"})
     */
    public function activateAccount(string $token, 
                                    UserDataPersister $userDataPersister, 
                                    RouterInterface $router): JsonResponse
    {
        // Find the user with the given activation token
        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy(['activationToken' => $token]);

        if (!$user) {
            return new JsonResponse(['message' => 'Invalid activation token'], Response::HTTP_BAD_REQUEST);
        }

        // Activate the user's account
        $user->setIsVerified(true);
        // Persist account validation
        $this->userDataPersister->persist($user);

        // Redirect the user to the Angular login page
        $loginUrl = $router->generate('http://localhost:4200/login');
        return $this->redirect($loginUrl);

        // return new JsonResponse(['status' => 200], Response::HTTP_OK);
    }

}
