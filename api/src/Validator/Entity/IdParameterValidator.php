<?php

namespace App\Validator\Entity;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;


/**
 * Validator to check the validity of id parameter.
 * @package App\Validator\Entity
 */
class IdParameterValidator
{
    /**
     * Check if parameter is a string and a number.
     * @param string $idValue The value of the id to validate.
     * @param bool $returnJsonResponse Indicates whether an error JSON response should be returned if invalid.
     * @return bool|JsonResponse True if the id is valid; otherwise, false or JsonResponse with/no error message.
     */
    public function isValidIdParameter(string $idValue, bool $returnJsonResponse = false): JsonResponse|bool
    {
        switch (true) {
            // Is a string
            case !is_string($idValue):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // Is a number
            case !is_numeric($idValue):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            default:
                return true;
        }
    }
}