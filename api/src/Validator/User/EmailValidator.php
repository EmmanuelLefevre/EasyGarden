<?php

namespace App\Validator\User;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


/**
 * Validator to check the validity of an email address.
 * @package App\Validator\User
 */
class EmailValidator
{
    /**
     * Check if the "email" param is defined in the request, is a string, and its value is not null or empty.
     * If any of these conditions are not met, return false; otherwise, return true.
     * @param string $paramName The parameter name for the email address to be checked.
     * @param bool $returnJsonResponse (Optional) If set to true, the method will return a JsonResponse on validation failure.
     * @param Request|null $request The HTTP request object or null if not provided.
     * @return bool True if the email is valid; otherwise, false or JsonResponse with/no error message.
     */
    public function isValidEmail(string $paramName, 
                                bool $returnJsonResponse = false, 
                                ?Request $request = null): JsonResponse|bool
    {
        // If the $request is null, validate the $paramName directly
        if ($request === null) {
            $email = $paramName;
        } else {
            // Check if the email parameter is present in the query parameters of the request
            if (!$request->query->has($paramName)) {
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;
            }

            $email = $request->query->get($paramName);
        }

        switch (true) {
            // Not null
            case trim($email) === '':
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // Is a string
            case !is_string($email):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;
                
            // Max lenght
            case strlen($email) > 45:
                return $returnJsonResponse ? new JsonResponse(['error' => 'Email cannot exceed 45 characters!'], 
                                                              Response::HTTP_BAD_REQUEST) : false;

            // Valid format
            case !filter_var($email, FILTER_VALIDATE_EMAIL):
                return $returnJsonResponse ? new JsonResponse(['error' => 'Invalid email format!'], 
                                                              Response::HTTP_BAD_REQUEST) : false;

            default:
                return true;
        }
    }
}