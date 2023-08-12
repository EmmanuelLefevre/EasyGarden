<?php

namespace App\Validator\Entity;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


/**
 * Validator to check the validity of pressure sensor.
 * @package App\Validator\Entity
 */
class PressureSensorValidator
{
    /**
     * Check if the "pressureSensor" param is defined in the request, is a string, and its value is not null or empty.
     * If any of these conditions are not met, return false; otherwise, return true.
     * @param string $paramName The name of the pressure sensor parameter.
     * @param Request|null $request The HTTP request object or null if not provided.
     * @return bool|JsonResponse True if the pressureSensor is valid; otherwise, false or JsonResponse with/no error message.
     */
    public function isValidPressureSensor(string $paramName,
                                          bool $returnJsonResponse = false,
                                          ?Request $request = null): JsonResponse|bool
    {
        // If the $request is null, validate the $paramName directly
        if ($request === null) {
            $pressureSensor = $paramName;
        } else {
            // Check if the pressure sensor parameter is present in the request
            if (!$request->request->has($paramName)) {
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;
            }

            $pressureSensor = $request->request->get($paramName);
        }

        switch (true) {
            // Not null
            case trim($pressureSensor) === '':
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // Is a string
            case !is_string($pressureSensor):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;
               
            // String start by "number + . + number"
            case !preg_match('/^\d+\.\d+/', $pressureSensor):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;
                    
            // String finish by "bars"
            case !preg_match('/bars$/', $pressureSensor):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            default:
                return true;
        }
    }

}