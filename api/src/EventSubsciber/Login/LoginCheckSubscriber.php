<?php

namespace App\Login\EventSubscriber;

use App\Repository\UserRepository;
use App\Validator\EmailValidator;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class LoginCheckSubscriber implements EventSubscriberInterface
{
    private $emailValidator;
    private $userRepository;
    private $userPasswordHasher;

    /**
     * LoginCheckSubscriber constructor.
     * @param EntityManagerInterface $entityManager The EntityManagerInterface instance used for persisting entities.
     * @param EmailValidator $emailValidator The validator responsible for email validation.
     * @param UserRepository $userRepository The repository responsible for retrieving User data.
     */
    public function __construct(EmailValidator $emailValidator,
                                UserPasswordHasherInterface $userPasswordHasher, 
                                UserRepository $userRepository)
    {
        $this->emailValidator = $emailValidator;
        $this->userRepository = $userRepository;
        $this->userPasswordHasher = $userPasswordHasher;
    }

    /**
     * Handle the kernel.request event and perform authentication for POST requests to /api/login_check.
     * @param RequestEvent $event The event object containing the request information.
     * @return void
     */
    public function onKernelRequest(RequestEvent $event)
    {
        // Check if it's a POST request to /api/login_check
        $request = $event->getRequest();
        if ($request->isMethod('POST') && $request->getPathInfo() === '/api/login_check') {

            $data = json_decode($request->getContent(), true);

            if ($data === null || !is_array($data)) {
                // Malformed or empty JSON, return an error response with 400 status
                return new Response('', Response::HTTP_BAD_REQUEST);
            }

            // Verify the presence of the required keys
            if (!isset($data['email']) || !isset($data['password'])) {
                // The required keys are not present in the JSON, return an error response with 400 status
                return new Response('', Response::HTTP_BAD_REQUEST);
            }

            $email = $data['email'];
            $plainPassword = $data['password'];

            if (empty($email) || empty($plainPassword)) {
                // Email or password is empty, return an error response with 400 status
                return new Response('', Response::HTTP_BAD_REQUEST);
            }
            
            // Validate the email parameter using EmailValidator
            if (!$this->emailValidator->isValidEmail($email, null)) {
                return new JsonResponse(['message' => 'Invalid email format'], Response::HTTP_BAD_REQUEST);
            }
            
            // Check if a user with the provided email already exists
            $existingUser = $this->userRepository->findByEmail($data['email']);
            // Email exists, now check the password
            if ($existingUser !== null && $existingUser instanceof UserPasswordHasherInterface) {
                if ($this->userPasswordHasher->isPasswordValid($existingUser, $plainPassword)) {
                    // Correct password, continue the authentication process
                    return;
                } 
                else {
                    // Incorrect password, return message response with 200 status
                    $response = new JsonResponse(['message' => 'Incorrect password!'], Response::HTTP_OK);
                    $event->setResponse($response);
                    return;
                }
            } 
            else {
                // Email does not exist, return message response with 200 status
                $response = new JsonResponse(['message' => 'No existing email!'], Response::HTTP_OK);
                $event->setResponse($response);
                return;
            }
            
        }
    }

    /**
     * Returns the subscribed events for this listener.
     *
     * @return array The array of subscribed events, mapping event names to the corresponding method names.
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::REQUEST => 'onKernelRequest'
        ];
    }
}