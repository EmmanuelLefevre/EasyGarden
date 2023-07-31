<?php

namespace App\EventSubscriber;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;


class LoginCheckSubscriber implements EventSubscriberInterface
{
    private $userRepository;

    /**
     * LoginCheckSubscriber constructor.
     *
     * @param UserRepository $userRepository The repository responsible for retrieving User data.
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Handle the kernel.request event and perform authentication for POST requests to /api/login_check.
     *
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
                $response = new JsonResponse(['message' => 'Invalid JSON data!'], Response::HTTP_BAD_REQUEST);
                $event->setResponse($response);
                return;
            }

            // Verify the presence of the required keys
            if (!isset($data['email']) || !isset($data['password'])) {
                // The required keys are not present in the JSON, return an error response with 400 status
                $response = new JsonResponse(['message' => 'Invalid required keys!'], Response::HTTP_BAD_REQUEST);
                $event->setResponse($response);
                return;
            }

            $email = $data['email'];
            $plainPassword = $data['password'];

            if (empty($email) || empty($plainPassword)) {
                // Email or password is empty, return an error response with 400 status
                $response = new JsonResponse(['message' => 'Email or password is empty!'], Response::HTTP_BAD_REQUEST);
                $event->setResponse($response);
                return;
            }

            // Check if a user with the provided email already exists
            $existingUser = $this->userRepository->findByEmail($data['email']);
            if ($existingUser !== null && $existingUser instanceof PasswordAuthenticatedUserInterface) {
                // Email exists, now check the password
                if ($existingUser->isPasswordValid($plainPassword)) {
                    // Correct password, continue the authentication process
                    return;
                } 
                else {
                    // Incorrect password, return an error response with 401 status
                    $response = new JsonResponse(['message' => 'Incorrect password!'], Response::HTTP_UNAUTHORIZED);
                    $event->setResponse($response);
                    return;
                }
            } 
            else {
                // Email does not exist, return an error response with 404 status
                $response = new JsonResponse(['message' => 'No existing email!'], Response::HTTP_NOT_FOUND);
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