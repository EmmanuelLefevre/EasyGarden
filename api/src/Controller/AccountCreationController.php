<?php

namespace App\Controller;

use App\DataPersister\UserDataPersister;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
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

    private function generateActivationToken(): string
    {
        // Generate a random activation token
        return bin2hex(random_bytes(32));
    }

    /**
     * @Route("/account_creation", name="account_creation", methods={"POST"})
     */
    public function accountCreation(Request $request, MailerInterface $mailer, UrlGeneratorInterface $urlGenerator, UserDataPersister $userDataPersister): JsonResponse
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

        // Generate an activation token for the user
        $activationToken = $this->generateActivationToken();
        $user->setActivationToken($activationToken);

        // Send the account creation confirmation email with activation link
        $activationLink = $urlGenerator->generate('account_activation', ['token' => $activationToken], UrlGeneratorInterface::ABSOLUTE_URL);

        // Interpolate the first name and last name into the subject
        $subject = sprintf('Veuillez activer votre compte %s %s', $user->getFirstName(), $user->getLastName());

        // Generate email
        $email = (new Email())
            ->from('esaygarden@easygarden.com')
            ->to($user->getEmail())
            ->subject($subject)
            ->text('Cliquez sur le lien suivant pour activer votre compte : ' . $activationLink)
            ->html('<p>Cliquez sur le lien suivant pour activer votre compte : <a href="' . $activationLink . '">Activer le compte</a></p>');

        $mailer->send($email);

        // Return a success response with no content
        return new JsonResponse(null, Response::HTTP_CREATED);
    
    }

    /**
     * @Route("/account_activation/{token}", name="account_activation", methods={"GET"})
     */
    public function activateAccount(string $token, UserDataPersister $userDataPersister): JsonResponse
    {
        // Find the user with the given activation token
        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy(['activationToken' => $token]);

        if (!$user) {
            return new JsonResponse(['message' => 'Invalid activation token'], Response::HTTP_BAD_REQUEST);
        }

        // Activate the user's account
        $user->setIsVerified(true);

        // Persist the user using the UserDataPersister only after account confirmation
        $userDataPersister->persist($user);

        return new JsonResponse(['status' => 201], Response::HTTP_CREATED);
    }
}
