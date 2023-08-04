<?php

namespace App\Validator\User;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class PhoneNumberValidator
{
    /**
     * Check if the "phoneNumber" param is defined in the request, is a string, and its value is not null or empty.
     * If any of these conditions are not met, return false; otherwise, return true.
     * @param Request|null $request The HTTP request object or null if not provided.
     * @return bool|JsonResponse True if the phoneNumber is valid; otherwise, false or JsonResponse with/no error message.
     */
    public function isValidName(string $paramName,
                                bool $returnJsonResponse = false,
                                ?Request $request = null): JsonResponse|bool
    {
        // If the $request is null, validate the $paramName directly
        if ($request === null) {
            $phoneNumber = $paramName;
        } else {
            // Check if the plain password parameter is present in the request
            if (!$request->request->has($paramName)) {
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;
            }

            $phoneNumber = $request->request->get($paramName);
        }

        switch (true) {
            // Not null
            case trim($phoneNumber) === '':
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // Is a string
            case !is_string($phoneNumber):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // Min length
            case strlen($phoneNumber) < 10:
                return $returnJsonResponse ? new JsonResponse(['error' => 'Phone number must contain at least 3 characters!'], 
                                                              Response::HTTP_BAD_REQUEST) : false;

            // Max lenght
            case strlen($phoneNumber) > 15:
                return $returnJsonResponse ? new JsonResponse(['error' => 'Phone number cannnot exceed 25 characters!'], 
                                                              Response::HTTP_BAD_REQUEST) : false;
            
            // Authorized character
            case !preg_match('/[0-9 -+/]/', $phoneNumber):
                return $returnJsonResponse ? new JsonResponse(['error' => 'Phone number can only contain digits (only hyphens, slashes and spaces are accepted)!'], 
                                                              Response::HTTP_BAD_REQUEST) : false;

            default:
                return true;
        }
    }

}