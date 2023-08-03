<?php

namespace App\Validator;

use Symfony\Component\HttpFoundation\Request;


class EmailValidator
{
   /**
     * Check if the "email" param is defined in the request, is a string, and its value is not null or empty.
     * If any of these conditions are not met, return false; otherwise, return true.
     * @param Request $request The HTTP request object.
     * @param string $paramName The parameter name for the email address to be checked.
     * @return bool True if the email is valid; otherwise, false.
     */
    public function isValidEmailParam(Request $request, string $paramName): bool
    {
        // Check if the email parameter is present in the query parameters of the request
        if (!$request->query->has($paramName)) {
            return false;
        }

        $email = $request->query->get($paramName);

        // Check max length of email and not null or empty
        if (strlen($email) > 45 | trim($email) === '') {
            return false;
        }

        // Check if email is in a valid format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return false;
        }

        return true;
    }

    /**
     * Check if the "email" param is defined in the request, is a string, and its value is not null or empty.
     * If any of these conditions are not met, return false; otherwise, return true.
     * @param Request $request The HTTP request object.
     * @param string $paramName The parameter name for the email address to be checked.
     * @return bool True if the email is valid; otherwise, false.
     */
    public function isValidEmail(string $paramName): bool
    {
        // Check max length of email and not null or empty
        if (strlen($paramName) > 45 | trim($paramName) === '') {
            return false;
        }

        // Check if email is in a valid format
        if (!filter_var($paramName, FILTER_VALIDATE_EMAIL)) {
            return false;
        }

        return true;
    }

}