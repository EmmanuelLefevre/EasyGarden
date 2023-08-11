<?php

namespace App\Utility\HttpAllowedMethod;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;


/**
 * Represents a custom exception for unauthorized HTTP method.
 * This exception is thrown when there is an issue with an unauthorized HTTP method.
 * @package App\Utility\HttpAllowedMethod
 */
class HttpAllowedMethodException extends HttpException
{
    protected $jsonResponse;
    protected $statusCode;

    /**
     * HttpAllowedMethodException constructor.
     * @param string $message The error message.
     * @param int $statusCode The HTTP status code.
     */
    public function __construct(string $message)
    {
        parent::__construct(Response::HTTP_METHOD_NOT_ALLOWED, $message);
    }

}