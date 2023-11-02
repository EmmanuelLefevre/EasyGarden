<?php

namespace App\Validator\Entity;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


/**
 * Validator to check the validity of URI.
 * @package App\Validator\Entity
 */
class URIValidator
{
    /**
     * Check if the "URI" param is defined in the request, is a boolean, and its value is not null or empty.
     * If any of these conditions are not met, return false; otherwise, return true.
     * @param string $paramName The name of the URI parameter.
     * @param Request|null $request The HTTP request object or null if not provided.
     * @return bool|JsonResponse True if the URI is valid; otherwise, false or JsonResponse with/no error message.
     */
    public function isValidURI(string $paramName,
                               bool $returnJsonResponse = false,
                               ?Request $request = null): JsonResponse|bool
    {
        // If the $request is null, validate the $paramName directly
        if ($request === null) {
            // Invalid URI parameter name
            if ($paramName !== 'garden' && $paramName !== 'user') {
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;
            }

            $URI = $paramName;
        } else {
            // Check if the URI parameter is present in the request
            if (!$request->request->has($paramName)) {
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;
            }

            $URI = $request->request->get($paramName);
        }

        switch (true) {
            // Not null
            case trim($URI) === '':
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // Is a string
            case !is_string($URI):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // Valid URI format for 'user'
            case $paramName === 'user' && !preg_match('/^api\/users\/\d+$/', $URI):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            // Valid URI format for 'garden'
            case $paramName === 'garden' && !preg_match('/^api\/gardens\/\d+$/', $URI):
                return $returnJsonResponse ? new JsonResponse('', Response::HTTP_BAD_REQUEST) : false;

            default:
                return true;
        }
    }

}