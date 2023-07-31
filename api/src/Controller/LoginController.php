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
     * @param string Request $request The HTTP request object.
     * @return JsonResponse The JSON response with the boolean account verification status.
     * @Route("/api/check_account_validation", name="check_account_validation", methods={"GET"})
     */
    public function checkAccountValidation(Request $request): JsonResponse
    {
        $email = $request->query->get('email');

        $isVerified = $this->userRepository->isUserVerified($email);

        if ($isVerified) {
            return new JsonResponse(true, Response::HTTP_OK);
        } else {
            return new JsonResponse(false, Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Check if user exists in the database based on the provided email [UniqueEntity]
     * This method is accessible via GET request to "/api/check_if_email_exist"
     * @param string Request $request The HTTP request object.
     * @return JsonResponse The JSON response with the boolean indicating whether the email exists or not.
     * @Route("/api/check_if_email_exist", name="check_if_email_exist", methods={"GET"})
     */
    public function checkIfEmailExist(Request $request): JsonResponse
    {
        $email = $request->query->get('email');

        $emailExists = $this->userRepository->checkIfUserExist($email);

        if ($emailExists) {
            return new JsonResponse(true, Response::HTTP_OK);
        } else {
            return new JsonResponse(false, Response::HTTP_NOT_FOUND);
        }

        // if ($emailExists) {
        //     return new JsonResponse(['exists' => true], Response::HTTP_OK);
        // } else {
        //     return new JsonResponse(['exists' => false, 'error' => 'Account doesn\'t exist!'], Response::HTTP_NOT_FOUND);
        // }
    }
}
