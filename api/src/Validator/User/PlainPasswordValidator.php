<?php

namespace App\Validator\User;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


/**
 * Validator to check the validity of a plain passsword.
 * @package App\Validator\User
 */
class PlainPasswordValidator
{
    /**
     * Check if the "plainPassword" param is defined in the request, is a string, and its value is not null or empty.
     * If any of these conditions are not met, return false; otherwise, return true.
     * @param string $paramName The name of the plain password parameter.
     * @param Request|null $request The HTTP request object or null if not provided.
     * @return bool|JsonResponse True if the plainPassword is valid; otherwise, false or JsonResponse with/no error message.
     */
    public function isValidPlainPassword(string $paramName,
                                         bool $returnJsonResponse = false,
                                         ?Request $request = null): JsonResponse|bool
    {
        // If the $request is null, validate the $paramName directly
        if ($request === null) {
            $plainPassword = $paramName;
        } else {
            // Check if the plain password parameter is present in the request
            if (!$request->request->has($paramName)) {
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;
            }

            $plainPassword = $request->request->get($paramName);
        }

        switch (true) {
            // Not null
            case trim($plainPassword) === '':
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // Is a string
            case !is_string($plainPassword):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // Min length
            case strlen($plainPassword) < 8:
                return $returnJsonResponse ? new JsonResponse(['error' => 'Password must contain at least 8 characters!'],
                                                              Response::HTTP_BAD_REQUEST) : false;

            // Max lenght
            case strlen($plainPassword) > 50:
                return $returnJsonResponse ? new JsonResponse(['error' => 'Password cannnot exceed 50 characters!'],
                                                              Response::HTTP_BAD_REQUEST) : false;

            // Uppercase letter
            case !preg_match('/[A-Z]/', $plainPassword):
            return $returnJsonResponse ? new JsonResponse(['error' => 'Password must contain at least one capital letter!'],
                                                          Response::HTTP_BAD_REQUEST) : false;

            // Lowercase letter
            case !preg_match('/[a-z]/', $plainPassword):
                return $returnJsonResponse ? new JsonResponse(['error' => 'Password must contain at least one lowercase letter!'],
                                                              Response::HTTP_BAD_REQUEST) : false;

            // Number
            case !preg_match('/[0-9]/', $plainPassword):
                return $returnJsonResponse ? new JsonResponse(['error' => 'Password must contain at least one digit!'],
                                                              Response::HTTP_BAD_REQUEST) : false;

            // Special character
            case !preg_match('/[~µ^!@#$%^&*§£¤µ@(),.;?":{}|<>\/]/', $plainPassword):
                return $returnJsonResponse ? new JsonResponse(['error' => 'Password must contain at least one special character!'],
                                                              Response::HTTP_BAD_REQUEST) : false;

            // No space
            case preg_match('/\s/', $plainPassword):
                return $returnJsonResponse ? new JsonResponse(['error' => 'Password cannot contain spaces!'],
                                                      Response::HTTP_BAD_REQUEST) : false;

            default:
                return true;
        }
    }

}