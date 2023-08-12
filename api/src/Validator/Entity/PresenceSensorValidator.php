<?php

namespace App\Validator\Entity;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


/**
 * Validator to check the validity of presence sensor.
 * @package App\Validator\Entity
 */
class PresenceSensorValidator
{
    /**
     * Check if the "presenceSensor" param is defined in the request, is a boolean, and its value is not null or empty.
     * If any of these conditions are not met, return false; otherwise, return true.
     * @param string $paramName The name of the presence sensor parameter.
     * @param Request|null $request The HTTP request object or null if not provided.
     * @return bool|JsonResponse True if the presenceSensor is valid; otherwise, false or JsonResponse with/no error message.
     */
    public function isValidStatus(string $paramName,
                                  bool $returnJsonResponse = false,
                                  ?Request $request = null): JsonResponse|bool
    {
        // If the $request is null, validate the $paramName directly
        if ($request === null) {
            $presenceSensor = $paramName;
        } else {
            // Check if the presence sensor parameter is present in the request
            if (!$request->request->has($paramName)) {
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;
            }

            $presenceSensor = $request->request->get($paramName);
        }

        switch (true) {
            // Invalid presence sensor parameter name
            case $presenceSensor !== 'presenceSensor':
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // Not null
            case trim($presenceSensor) === '':
                return $returnJsonResponse ? new JsonResponse(['error' => 'Null!'], Response::HTTP_BAD_REQUEST) : false;

            // Is a boolean
            case !is_bool($presenceSensor):
                return $returnJsonResponse ? new JsonResponse(['error' => 'Not boolean!'], Response::HTTP_BAD_REQUEST) : false;

            // Check if the value is either true or false
            if ($presenceSensor !== true && $presenceSensor !== false) {
                return $returnJsonResponse ? new JsonResponse(['error' => 'not true, not false!'], Response::HTTP_BAD_REQUEST) : false;
            }

            default:
                return true;
        }
    }

}