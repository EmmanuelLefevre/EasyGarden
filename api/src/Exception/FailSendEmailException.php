<?php

namespace App\Exception;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;


/**
 * Custom exception to indicate an email sending failure.
 * This exception is thrown when there is a problem sending an email.
 * @package App\Exception
 */
class FailSendEmailException extends HttpException
{
    protected $jsonResponse;
    protected $statusCode;

    /**
     * FailSendEmailException constructor.
     * @param string $message The error message.
     * @param \Exception|null $previous Previous exception for error traceability (optional).
     */
    public function __construct(string $message, \Exception $previous = null)
    {
        parent::__construct(Response::HTTP_INTERNAL_SERVER_ERROR, $message, $previous);
    }
}
