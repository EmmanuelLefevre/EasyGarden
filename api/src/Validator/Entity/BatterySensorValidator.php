<?php

namespace App\Validator\Entity;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


/**
 * Validator to check the validity of battery sensor.
 * @package App\Validator\Entity
 */
class BatterySensorValidator
{
    /**
     * Check if the "batterySensor" param is defined in the request, is a string, and its value is not null or empty.
     * If any of these conditions are not met, return false; otherwise, return true.
     * @param string $paramName The name of the battery sensor parameter.
     * @param Request|null $request The HTTP request object or null if not provided.
     * @return bool|JsonResponse True if the batterySensor is valid; otherwise, false or JsonResponse with/no error message.
     */
    public function isValidBatterySensor(string $paramName,
                                         bool $returnJsonResponse = false,
                                         ?Request $request = null): JsonResponse|bool
    {
        // If the $request is null, validate the $paramName directly
        if ($request === null) {
            $batterySensor = $paramName;
        } else {
            // Check if the battery sensor parameter is present in the request
            if (!$request->request->has($paramName)) {
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;
            }

            $batterySensor = $request->request->get($paramName);
        }

        switch (true) {
            // Not null
            case trim($batterySensor) === '':
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // Is a string
            case !is_string($batterySensor):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // Contains "%" at the end of the string
            case !preg_match('/%$/', $batterySensor):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // String starts with digits
            case !preg_match('/^\d/', $batterySensor):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            default:
                return true;
        }
    }

}