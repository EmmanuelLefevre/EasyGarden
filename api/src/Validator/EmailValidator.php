<?php

namespace App\Validator;

use Symfony\Component\HttpFoundation\Request;


class EmailValidator
{
    /**
     * Check if the "email" param is defined in the request, is a string, and its value is not null or empty.
     * If any of these conditions are not met, return false; otherwise, return true.
     * @param string $paramName The parameter name for the email address to be checked.
     * @param Request|null $request The HTTP request object or null if not provided.
     * @return bool True if the email is valid; otherwise, false.
     */
    // public function isValidEmail(string $paramName, ?Request $request = null): bool
    // {
    //     // If the $request is null, validate the $paramName directly
    //     if ($request === null) {
    //         // Check email max length, not null or empty and is a string
    //         if (strlen($paramName) > 45 
    //             || trim($paramName) === ''
    //             || !is_string($paramName)) {
    //             return false;
    //         }

    //         // Check if email is in a valid format
    //         if (!filter_var($paramName, FILTER_VALIDATE_EMAIL)) {
    //             return false;
    //         }

    //         return true;
    //     }

    //     // Check if the email parameter is present in the query parameters of the request
    //     if (!$request->query->has($paramName)) {
    //         return false;
    //     }

    //     $email = $request->query->get($paramName);

    //     // Check max length of email, not null or empty and is a string
    //     if (strlen($email) > 45 
    //         || trim($email) === ''
    //         || !is_string($paramName)) {
    //         return false;
    //     }

    //     // Check if email is in a valid format
    //     if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    //         return false;
    //     }

    //     return true;
    // }
    public function isValidEmail(string $paramName, ?Request $request = null): bool
    {
        // If the $request is null, validate the $paramName directly
        if ($request === null) {
            $email = $paramName;
        } else {
            // Check if the email parameter is present in the query parameters of the request
            if (!$request->query->has($paramName)) {
                return false;
            }

            $email = $request->query->get($paramName);
        }

        // Check email max length, not null or empty and is a string
        if (strlen($email) > 45 || trim($email) === '' || !is_string($email)) {
            return false;
        }

        // Check if email is in a valid format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return false;
        }

        return true;
    }
}