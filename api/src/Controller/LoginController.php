<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class LoginController extends AbstractController
{
    private $userRepository;

    /**
     * CheckAccountActivationController constructor.
     * @param UserRepository $userRepository The repository responsible for retrieving User data.
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Check account activation status based on the provided email [UniqueEntity]
     * This method is accessible via GET request to "/account_validation"
     * @param Request $request The HTTP request object.
     * @return JsonResponse The JSON response with the message verification status message.
     * @Route("/api/check_account_validation", name="check_account_validation", methods={"GET"})
     */
    public function checkAccountValidation(Request $request): JsonResponse
    {
        $email = $request->query->get('email');

        if (!$this->isValidEmailParam($request, $email)) {
            return new Response('', Response::HTTP_BAD_REQUEST);
        }

        $isVerified = $this->userRepository->isUserVerified($email);
        $message = $isVerified ? 'Account is verified!' : 'Account not verified!';
        
        return new JsonResponse(['message' => $message], Response::HTTP_OK);
    }

    /**
     * Check if user exists in the database based on the provided email [UniqueEntity]
     * This method is accessible via GET request to "/api/check_if_email_exist"
     * @param Request $request The HTTP request object.
     * @return JsonResponse The JSON response with the indicating message whether the email exists or not.
     * @Route("/api/check_if_email_exist", name="check_if_email_exist", methods={"GET"})
     */
    public function checkIfEmailExist(Request $request): JsonResponse
    {
        $email = $request->query->get('email');

        $emailExists = $this->userRepository->checkIfUserExist($email);
        $message = $emailExists ? 'Email Exist!' : `Email doesn't exist!`;

        if (!$this->isValidEmailParam($request, $email)) {
            return new Response('', Response::HTTP_BAD_REQUEST);
        }

        return new JsonResponse(['message' => $message], Response::HTTP_OK);

    }

    /**
     * Check if the "email" param is defined in the request, is a string, and its value is not null or empty.
     * If any of these conditions are not met, return a JSON response with a bad request status.
     * @param Request $request The HTTP request object.
     * @param string $email The email address to be checked.
     * @return bool True if the email is valid; otherwise, false.
     */
    private function isValidEmailParam(Request $request, string $email): bool
    {
        if (!$request->query->has('email') || !is_string($email) || trim($email) === '') {
            return false;
        }

        return true;
    }

}
