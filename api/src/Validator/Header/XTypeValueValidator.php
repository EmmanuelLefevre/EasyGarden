<?php

namespace App\Validator\Header;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;


/**
 * Validator to check the validity of X-Type.
 * @package App\Validator\Header
 */
class XTypeValueValidator {
    /**
     * Checks if X-Type is valid.
     * @param string $xType The name of the header to check.
     * @param bool $returnJsonResponse Indicates whether the method should return a JSON response on error.
     * @return bool|JsonResponse True if the xType is valid; otherwise, false or JsonResponse with/no error message.
     */
    public function isValidXTypeValue(string $xType, bool $returnJsonResponse = false): JsonResponse|bool
    {
        // Is a string
        if (!is_string($xType)) {
            return $returnJsonResponse ? new JsonResponse('X-Type must be a string!', Response::HTTP_BAD_REQUEST) : false;
        }

        // Defined array
        $allowedXTypes = ['lawnmower', 'lightning', 'pool', 'portal', 'watering'];

        // Is in defined array
        if (!in_array($xType, $allowedXTypes, true)) {
            return $returnJsonResponse ? new JsonResponse('Wrong defined X-Type!', Response::HTTP_BAD_REQUEST) : false;
        }

        return true;
    }
}
