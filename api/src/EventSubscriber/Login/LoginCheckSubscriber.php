<?php

namespace App\EventSubscriber\Login;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Exception\JsonValidationException;
use App\Repository\UserRepository;
use App\Validator\Json\JsonRequestValidator;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;


/**
 * Class LoginCheckSubscriber
 * This class subscribes to the kernel.request event to perform authentication for POST requests to /api/login_check.
 * It uses a JSON data validator service to validate the JSON format of the request and authenticates users based on email and password.
 * Handles cases of existing email or incorrect password.
 * @package App\EventSubscriber\Login
 */
class LoginCheckSubscriber implements EventSubscriberInterface
{
    private $eventDispatcher;
    private $jsonRequestValidator;
    private $userRepository;
    private $userPasswordHasher;

    /**
     * LoginCheckSubscriber constructor.
     * @param EventDispatcherInterface $eventDispatcher The EventDispatcherInterface instance used for dispatching events.
     * @param JsonRequestValidator $jsonRequestValidator The validator responsible for validating the json format of the request.
     * @param UserPasswordHasherInterface $userPasswordHasher The password hasher.
     * @param UserRepository $userRepository The repository responsible for retrieving User data.
     */
    public function __construct(EventDispatcherInterface $eventDispatcher,
                                JsonRequestValidator $jsonRequestValidator,
                                UserPasswordHasherInterface $userPasswordHasher, 
                                UserRepository $userRepository)
    {
        $this->eventDispatcher = $eventDispatcher;
        $this->jsonRequestValidator = $jsonRequestValidator;
        $this->userRepository = $userRepository;
        $this->userPasswordHasher = $userPasswordHasher;
    }

    /**
     * Handle the kernel.request event and perform authentication for POST requests to /api/login_check.
     * @param RequestEvent $event The event object containing the request information.
     */
    public function onKernelRequest(RequestEvent $event)
    {
        // Check if it's a POST request to /api/login_check
        $request = $event->getRequest();
        if ($request->isMethod('POST') && $request->getPathInfo() === '/api/login_check') {

            $data = json_decode($request->getContent(), true);

            // Check the presence of required keys and if their fields are valid
            try {
                // Validate json data using JsonDataValidatorService, including custom validators
                $data = $this->jsonRequestValidator->validateJsonData($request, ['email', 'password']);
            } 
            catch (JsonValidationException  $e) {
                // Handle json validation exception by returning a json response with the error message
                $response = new JsonResponse(['message' => $e->getMessage()], $e->getStatusCode());
                // Stop other listeners from being called
                $event->stopPropagation();
                // Set response
                $event->setResponse($response);
                // Return early to exit the event handling
                return;
            }
            
            // Check if a user with the provided email already exists
            $existingUser = $this->userRepository->findByEmail($data['email']);
            // Email exists, now check the password
            $plainPassword = $data['password'];
            if ($existingUser !== null) {
                if ($this->userPasswordHasher->isPasswordValid($existingUser, $plainPassword)) {
                    // Correct password, continue the authentication process
                    return;
                } 
                else {
                    // Incorrect password => set errorMessage
                    $errorMessage = 'Invalid password!';
                }
            } 
            else {
                // Email does not exist => set errorMessage
                $errorMessage = 'No existing email!';
            }

            // Create AuthenticationFailureEvent
            $exception = new AuthenticationException($errorMessage);
            $failureEvent = new AuthenticationFailureEvent($exception, 
                new JsonResponse(['message' => $errorMessage], Response::HTTP_UNAUTHORIZED));

            // Stop other listeners from being called
            $event->stopPropagation();
            $this->eventDispatcher->dispatch($failureEvent, 'lexik_jwt_authentication.on_authentication_failure');
            // Set response
            $response = $failureEvent->getResponse();
            $event->setResponse($response);
        }
    }

    /**
     * Returns the subscribed events for this listener.
     * @return array The array of subscribed events, mapping event names to the corresponding method names.
     */
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => ['onKernelRequest',EventPriorities::POST_WRITE]
        ];
    }

}
