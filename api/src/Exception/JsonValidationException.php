<?php

namespace App\Exception;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;


/**
 * Represents a custom exception for JSON validation errors.
 * This exception is thrown when there is an issue with JSON validation.
 * @package App\Exception
 */
class JsonValidationException extends HttpException
{
    protected $jsonResponse;
    protected $statusCode;
    
    /**
     * JsonValidationException constructor.
     * @param string $message The error message.
     */
    public function __construct(string $message)
    {
        parent::__construct(Response::HTTP_BAD_REQUEST, $message);
    }
}
