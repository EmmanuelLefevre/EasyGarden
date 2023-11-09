<?php

namespace App\Exception;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;


/**
 * Represents a custom exception for not found repository.
 * This exception is thrown when there is an issue with not found repository.
 * @package App\Exception
 */
class FailSendEmailException extends HttpException
{
    protected $jsonResponse;
    protected $statusCode;

    /**
     * FailSendEmailException constructor.
     * @param string $message The error message.
     */
    public function __construct(string $message)
    {
        parent::__construct(Response::HTTP_INTERNAL_SERVER_ERROR, $message);
    }
}
