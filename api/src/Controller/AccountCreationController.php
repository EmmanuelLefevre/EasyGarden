<?php

namespace App\Controller;

use App\DataPersister\UserDataPersister;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Service\AccountCreationEmailService;
use App\Utility\TokenGenerator;
use App\Utility\UserTimeZoneAndDateTimeDetector;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\RouterInterface;

class AccountCreationController extends AbstractController
{
    private $userDataPersister;
    private $userPasswordHasher;
    private $emailService;
    private $entityManager;

    public function __construct(UserDataPersister $userDataPersister, 
                                AccountCreationEmailService $emailService,
                                EntityManagerInterface $entityManager)
    {
        $this->userDataPersister = $userDataPersister;
        $this->emailService = $emailService;
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/account_creation", name="account_creation", methods={"POST"})
     */
    public function accountCreation(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Check if a user with the provided email already exists
        $existingUser = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);
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

        // Use the UserTimeZoneAndDateTimeDetector class
        $userTimeZone = UserTimeZoneAndDateTimeDetector::userTimeZoneAndDateTimeDetector();
        // Set the createdAt property with the user's timezone
        $createdAt = new \DateTimeImmutable('now', new \DateTimeZone($userTimeZone));
        $user->setCreatedAt($createdAt);

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
     * @Route("/account_activation/{token}", name="account_activation", methods={"GET", "POST"})
     */
    public function activateAccount(string $token, 
                                    UserDataPersister $userDataPersister, 
                                    RouterInterface $router): RedirectResponse
    {
        // Find the user with the given activation token
        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->findOneBy(['activationToken' => $token]);

        if (!$user) {
            return new JsonResponse(['message' => 'Invalid activation token'], Response::HTTP_BAD_REQUEST);
        }

        // Activate the user's account
        $user->setIsVerified(true);

        // Use the UserTimeZoneAndDateTimeDetector class
        $userTimeZone = UserTimeZoneAndDateTimeDetector::userTimeZoneAndDateTimeDetector();
        // Set the updatedAt property with the user's timezone
        $updatedAt = new \DateTime('now', new \DateTimeZone($userTimeZone));
        $user->setUpdatedAt($updatedAt);

        // Persist account validation
        $this->entityManager->merge($user);
        $this->entityManager->flush();

        // Redirect the user to the Angular verified account page (external URL)
        $loginUrl = 'http://localhost:4200/verified-account';
        return new RedirectResponse($loginUrl);
    }

}
