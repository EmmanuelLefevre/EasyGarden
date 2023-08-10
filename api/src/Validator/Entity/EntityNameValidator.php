<?php

namespace App\Validator\Entity;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


/**
 * Validator to check the validity of an entity name.
 * @package App\Validator\Entity
 */
class EntityNameValidator
{
    /**
     * Check if the "entityName" param is defined in the request, is a string, and its value is not null or empty.
     * If any of these conditions are not met, return false; otherwise, return true.
     * @param Request|null $request The HTTP request object or null if not provided.
     * @return bool|JsonResponse True if the entityName is valid; otherwise, false or JsonResponse with/no error message.
     */
    public function isValidName(string $paramName,
                                bool $returnJsonResponse = false,
                                ?Request $request = null): JsonResponse|bool
    {
        // If the $request is null, validate the $paramName directly
        if ($request === null) {
            $entityName = $paramName;
        } else {
            // Check if the plain password parameter is present in the request
            if (!$request->request->has($paramName)) {
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;
            }

            $entityName = $request->request->get($paramName);
        }

        switch (true) {
            // Not null
            case trim($entityName) === '':
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // Is a string
            case !is_string($entityName):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // Min length
            case strlen($entityName) < 3:
                return $returnJsonResponse ? new JsonResponse(['error' => 'Name must contain at least 3 characters!'], 
                                                              Response::HTTP_BAD_REQUEST) : false;

            // Max lenght
            case strlen($entityName) > 25:
                return $returnJsonResponse ? new JsonResponse(['error' => 'Name cannnot exceed 25 characters!'], 
                                                              Response::HTTP_BAD_REQUEST) : false;
            
            // Authorized character
            case !preg_match('/[A-Za-z -.]/', $entityName):
                return $returnJsonResponse ? new JsonResponse(['error' => 'Name can only contain lowercase or uppercase letters (dot, hyphens and spaces are accepted)!'], 
                                                              Response::HTTP_BAD_REQUEST) : false;

            default:
                return true;
        }
    }

}