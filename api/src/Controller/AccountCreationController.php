<?php

namespace App\Controller;

use App\DataPersister\UserDataPersister;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AccountCreationController extends AbstractController
{
    private $userDataPersister;
    private $userPasswordHasher;

    public function __construct(UserDataPersister $userDataPersister, UserPasswordHasherInterface $userPasswordHasher)
    {
        $this->userDataPersister = $userDataPersister;
        $this->userPasswordHasher = $userPasswordHasher;
    }

    /**
     * @Route("/account_creation", name="account_creation", methods={"POST"})
     */
    public function accountCreation(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = new User();
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

        // Add logic for sending the confirmation email here
        

        // Persist the user using the UserDataPersister
        $this->userDataPersister->persist($user);

        // Return a success response with status code 200
        return new JsonResponse(['status' => 200]);
    }
}
