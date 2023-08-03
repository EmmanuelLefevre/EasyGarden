<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Validator\EmailValidator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class LoginController extends AbstractController
{
    private $emailValidator;
    private $userRepository;

    /**
     * CheckAccountActivationController constructor.
     * @param EmailValidator $emailValidator The validator responsible for email validation.
     * @param UserRepository $userRepository The repository responsible for retrieving User data.
     */
    public function __construct(EmailValidator $emailValidator,
                                UserRepository $userRepository)
    {
        $this->emailValidator = $emailValidator;
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
        $paramName = 'email'; 

        if (!$this->emailValidator->isValidEmailParam($request, $paramName)) {
            return new JsonResponse(['error' => 'Invalid email format!'], Response::HTTP_BAD_REQUEST);
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
        $paramName = 'email'; 

        if (!$this->emailValidator->isValidEmailParam($request, $paramName)) {
            return new JsonResponse(['error' => 'Invalid email format!'], Response::HTTP_BAD_REQUEST);
        }

        $emailExists = $this->userRepository->checkIfUserExist($email);
        $message = $emailExists ? 'Email Exist!' : `Email doesn't exist!`;

        return new JsonResponse(['message' => $message], Response::HTTP_OK);

    }

}
