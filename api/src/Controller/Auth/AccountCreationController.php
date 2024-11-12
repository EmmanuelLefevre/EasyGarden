<?php

namespace App\Controller\Auth;

use App\Entity\User;
use App\Exception\FailSendEmailException;
use App\Exception\JsonValidationException;
use App\DataPersister\UserDataPersister;
use App\Repository\UserRepository;
use App\Validator\Json\JsonRequestValidator;
use App\Service\Mailing\AccountCreationEmailService;
use App\Utility\Date\DateTimeConverter;
use App\Utility\Token\TokenGenerator;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


/**
 * Class AccountCreationController
 * This controller handles user account creation and activation.
 * It provides endpoints for creating user accounts and activating accounts using activation tokens.
 * @package App\Controller\Auth
 */
class AccountCreationController extends AbstractController
{
    private $emailService;
    private $jsonRequestValidator;
    private $logger;
    private $userDataPersister;
    private $userRepository;

    /**
     * AccountCreationController constructor.
     * @param AccountCreationEmailService $emailService The service responsible for sending account creation emails.
     * @param JsonRequestValidator $jsonRequestValidator The validator responsible for validating the json format of the request.
     * @param LoggerInterface $logger Take logs.
     * @param UserDataPersister $userDataPersister The service responsible for persisting user data.
     * @param UserRepository $userRepository The repository responsible for retrieving User data.
     */
    public function __construct(AccountCreationEmailService $emailService,
                                JsonRequestValidator $jsonRequestValidator,
                                LoggerInterface $logger,
                                UserDataPersister $userDataPersister,
                                UserRepository $userRepository)
    {
        $this->emailService = $emailService;
        $this->jsonRequestValidator = $jsonRequestValidator;
        $this->logger = $logger;
        $this->userDataPersister = $userDataPersister;
        $this->userRepository = $userRepository;
    }

    /**
     * Create user account
     * This method is accessible via POST request to "/account_creation"
     * @param string Request $request The HTTP request object.
     * @return JsonResponse
     * @throws FailSendEmailException If there is an issue sending the confirmation email.
     * @Route("/account_creation", name="account_creation", methods={"POST"})
     */
    public function accountCreation(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Check the presence of required keys and if their fields are valid
        try {
            // Validate json data using JsonDataValidatorService, including custom validators
            $data = $this->jsonRequestValidator->validateJsonData($request, ['email',
                                                                          'plainPassword',
                                                                          'pseudo',
                                                                          'lastName',
                                                                          'firstName',
                                                                          'phoneNumber']);
        }
        catch (JsonValidationException  $e) {
            // Handle json validation exception by returning a json response with the error message
            return new JsonResponse(['message' => $e->getMessage()], $e->getStatusCode());
        }

        // Check if a user with the provided email already exists
        $existingUser = $this->userRepository->findByEmail($data['email']);
        if ($existingUser) {
            return new JsonResponse(['message' => 'Email already exists!'], Response::HTTP_CONFLICT);
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
            // throw new FailSendEmailException('Failed to send email!');
            $this->logger->error('Erreur lors de l\'envoi de l\'email d\'activation : ' . $e->getMessage(), [
                'exception' => $e,
            ]);
            throw new FailSendEmailException('Failed to send email! : ' . $e->getMessage(), $e);
        }

        // Persist User
        $this->userDataPersister->persist($user);

        // Return a success response
        return new JsonResponse(['message' => 'Created Account!'], Response::HTTP_CREATED);
    }

    /**
     * Activate user account
     * This method is accessible via GET and POST request to "/account_activation/{token}"
     * @param string $token The activation token received as part of the URL.
     * @return RedirectResponse A RedirectResponse object that redirects the user to the Angular verified account page.
     * @Route("/api/account_activation/{token}", name="account_activation", methods={"GET","POST"})
     */
    public function activateAccount(string $token): RedirectResponse
    {

        // Check if token is not null and not an empty string
        if (!$token || !is_string($token)) {
            return new JsonResponse(['message' => 'Null or invalid activation token!'], Response::HTTP_FORBIDDEN);
            // return new RedirectResponse('http://localhost:4201/error?message=Token d\'activation nul ou invalide !');
        }
        // Find the user with the given activation token
        $user = $this->userRepository->findByActivationToken($token);

        if (!$user) {
            return new JsonResponse(['message' => 'Invalid activation token!'], Response::HTTP_FORBIDDEN);
            // return new RedirectResponse('http://localhost:4201/error?message=Token d\'activation nul ou invalide !');
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
        $loginUrl = 'http://localhost:4201/activated-account';
        return new RedirectResponse($loginUrl);
    }

}
