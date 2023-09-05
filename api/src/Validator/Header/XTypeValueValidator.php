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
    public function isValidXTypeValue(string $xType): JsonResponse|bool
    {
        // Defined array
        $allowedXTypes = ['lawnmower', 'lightning', 'pool', 'portal', 'watering'];

        switch (true) {
            // Is a string
            case !is_string($xType):
                return new JsonResponse('X-Type must be a string!', Response::HTTP_BAD_REQUEST);

            // Is in defined array
            case !in_array($xType, $allowedXTypes):
                return new JsonResponse('Wrong defined X-Type!', Response::HTTP_BAD_REQUEST);

            default:
                return true;
        }
    }
}
