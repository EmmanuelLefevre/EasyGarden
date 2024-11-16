<?php

namespace App\Validator\Entity;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


/**
 * Validator to check the validity of status equipment.
 * @package App\Validator\Entity
 */
class StatusValidator
{
    /**
     * Check if the "status" param is defined in the request, is a boolean, and its value is not null or empty.
     * If any of these conditions are not met, return false; otherwise, return true.
     * @param string $paramName The name of the status parameter.
     * @param Request|null $request The HTTP request object or null if not provided.
     * @return bool|JsonResponse True if the status is valid; otherwise, false or JsonResponse with/no error message.
     */
    public function isValidStatus(mixed $paramName,
                                  bool $returnJsonResponse = false,
                                  ?Request $request = null): JsonResponse|bool
    {
        // If the $request is null, validate the $paramName directly
        if ($request === null) {
            $status = $paramName;
        } else {
            // Check if the status parameter is present in the request
            if (!$request->request->has($paramName)) {
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;
            }

            $status = $request->request->get($paramName);
        }

        switch (true) {
            // If $status is null or an empty string, it's invalid
            case $status === null || (is_string($status) && trim($status) === ''):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // If $status is a strict boolean (true or false)
            case !is_bool($status):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // Check if the value is either true or false
            case is_string($status) && ($status === 'true' || $status === 'false'):
                $status = filter_var($status, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
                if ($status === null) {
                    return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;
                }
                break;

            default:
                return true;
        }
    }

}