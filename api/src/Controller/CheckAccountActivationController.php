<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class CheckAccountActivationController extends AbstractController
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Check account activation status based on email [UniqueEntity]
     * This method is accessible via GET request to "/account_validation"
     * 
     * @param string Request $request The HTTP request object.
     * 
     * @return JsonResponse The JSON response with the boolean account verification status.
     * 
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
}
