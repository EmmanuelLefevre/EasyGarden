<?php

namespace App\Controller\Auth;

use App\Repository\UserRepository;
use App\Validator\User\EmailValidator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


/**
 * Class LoginController
 * This controller handles account activation and email existence checking.
 * It provides endpoints for checking account activation status based on email and checking if an email exists in the database.
 * @package App\Controller\Auth
 */
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
     * This method is accessible via GET request to "/account_activation/{email}"
     * @param Request $request The HTTP request object.
     * @return JsonResponse The JSON response with the activation status message.
     * @Route("/api/check_account_activation/{email}", name="check_account_activation", methods={"GET"})
     */
    public function checkAccountActivation(Request $request): JsonResponse
    {
        $email = $request->query->get('email');
        $paramName = 'email';

        // Validate the email parameter using EmailValidator
        $validationResult = $this->emailValidator->isValidEmail($paramName, true, $request);
        if ($validationResult instanceof JsonResponse) {
            // Return JsonResponse instance on activation failure
            return $validationResult;
        }

        $isVerified = $this->userRepository->isUserVerified($email);
        $message = $isVerified ? 'Account is verified!' : 'Account not verified!';

        return new JsonResponse(['message' => $message], Response::HTTP_OK);
    }

    /**
     * Check if user exists in the database based on the provided email [UniqueEntity]
     * This method is accessible via GET request to "/api/check_if_email_exist/{email}"
     * @param Request $request The HTTP request object.
     * @return JsonResponse The JSON response with the indicating message whether the email exists or not.
     * @Route("/api/check_if_email_exist/{email}", name="check_if_email_exist", methods={"GET"})
     */
    public function checkIfEmailExist(Request $request): JsonResponse
    {
        $email = $request->query->get('email');
        $paramName = 'email';

        // Validate the email parameter using EmailValidator
        $validationResult = $this->emailValidator->isValidEmail($paramName, true, $request);
        if ($validationResult instanceof JsonResponse) {
            // Return JsonResponse instance on email exist failure
            return $validationResult;
        }

        $emailExists = $this->userRepository->checkIfUserExist($email);
        $message = $emailExists ? 'Email Exist!' : 'Email doesn\'t exist!';

        return new JsonResponse(['message' => $message], Response::HTTP_OK);

    }

}
