<?php

namespace App\Validator\User;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class NameValidator
{
    /**
     * Check if the "name" param is defined in the request, is a string, and its value is not null or empty.
     * If any of these conditions are not met, return false; otherwise, return true.
     * @param Request|null $request The HTTP request object or null if not provided.
     * @return bool|JsonResponse True if the name is valid; otherwise, false or JsonResponse with/no error message.
     */
    public function isValidName(string $paramName,
                                bool $returnJsonResponse = false,
                                ?Request $request = null): JsonResponse|bool
    {
        // If the $request is null, validate the $paramName directly
        if ($request === null) {
            $name = $paramName;
        } else {
            // Check if the plain password parameter is present in the request
            if (!$request->request->has($paramName)) {
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;
            }

            $name = $request->request->get($paramName);
        }

        switch (true) {
            // Not null
            case trim($name) === '':
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // Is a string
            case !is_string($name):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // Min length
            case strlen($name) < 3:
                return $returnJsonResponse ? new JsonResponse(['error' => 'Name must contain at least 3 characters!'], 
                                                              Response::HTTP_BAD_REQUEST) : false;

            // Max lenght
            case strlen($name) > 25:
                return $returnJsonResponse ? new JsonResponse(['error' => 'Name cannnot exceed 25 characters!'], 
                                                              Response::HTTP_BAD_REQUEST) : false;
            
            // Authorized character
            case !preg_match('/[A-Za-z -]/', $name):
                return $returnJsonResponse ? new JsonResponse(['error' => 'Name can only contain lowercase and uppercase letters (only hyphens and spaces are accepted)!'], 
                                                              Response::HTTP_BAD_REQUEST) : false;

            default:
                return true;
        }
    }

}