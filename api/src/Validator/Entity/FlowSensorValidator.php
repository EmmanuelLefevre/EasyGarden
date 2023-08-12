<?php

namespace App\Validator\Entity;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


/**
 * Validator to check the validity of flow sensor.
 * @package App\Validator\Entity
 */
class FlowSensorValidator
{
    /**
     * Check if the "flowSensor" param is defined in the request, is a string, and its value is not null or empty.
     * If any of these conditions are not met, return false; otherwise, return true.
     * @param string $paramName The name of the flow sensor parameter.
     * @param Request|null $request The HTTP request object or null if not provided.
     * @return bool|JsonResponse True if the flowSensor is valid; otherwise, false or JsonResponse with/no error message.
     */
    public function isValidFlowSensor(string $paramName,
                                      bool $returnJsonResponse = false,
                                      ?Request $request = null): JsonResponse|bool
    {
        // If the $request is null, validate the $paramName directly
        if ($request === null) {
            $flowSensor = $paramName;
        } else {
            // Check if the flow sensor parameter is present in the request
            if (!$request->request->has($paramName)) {
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;
            }

            $flowSensor = $request->request->get($paramName);
        }

        switch (true) {
            // Not null
            case trim($flowSensor) === '':
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // Is a string
            case !is_string($flowSensor):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;
               
            // String start by "number + . + number"
            case !preg_match('/^\d+\.\d+/', $flowSensor):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;
                    
            // String finish by "L/H"
            case !preg_match('/L\/H$/', $flowSensor):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            default:
                return true;
        }
    }

}