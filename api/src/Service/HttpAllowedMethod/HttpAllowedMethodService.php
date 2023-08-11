<?php

namespace App\Service\HttpAllowedMethod;

use App\Utility\HttpAllowedMethod\HttpAllowedMethodException;
use Symfony\Component\HttpFoundation\Request;


/**
 * Service responsible for validating the used http method.
 * This service validates if the provided HTTP method is allowed for the given endpoint.
 * @package App\Service\HttpAllowedMethod
 */
class HttpAllowedMethodService
{
    /**
     * Validates the HTTP method against the allowed methods.
     * @param Request $request The incoming request object.
     * @param array $allowedMethods An array of allowed HTTP methods for the endpoint.
     * @throws HttpAllowedMethodException if the provided HTTP method is not allowed.
     */
  public function validateHttpMethod(Request $request, array $allowedMethods): void
  {
      if (!in_array($request->getMethod(), $allowedMethods)) {
          throw new HttpAllowedMethodException('This endpoint only supports specified HTTP methods.');
      }
  }
}