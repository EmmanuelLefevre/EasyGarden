<?php

namespace App\Service\Header;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RequestStack;


/**
 * Service for extracting the value of the 'X-Type' header from the current HTTP request.
 * @package App\Service\Header
 */
class HeaderValueExtractor
{
    private $requestStack;

    /**
     * HeaderValueExtractor constructor.
     * @param RequestStack $requestStack The RequestStack instance.
     */
    public function __construct(RequestStack $requestStack)
    {
        $this->requestStack = $requestStack;
    }

    /**
     * Get the value of the 'X-Type' header from the current HTTP request.
     * @return string The value of the 'X-Type' header if it exists.
     * @throws \Exception If the 'X-Type' header is missing, throw an exception.
     */
    public function getXTypeHeaderValue(): string
    {
        $request = $this->requestStack->getCurrentRequest();
        
        if ($request) {
            $xTypeHeader = $request->headers->get('X-Type');
            if ($xTypeHeader !== null) {
                return $xTypeHeader;
            }
        }

        throw new \Exception('X-Type header is missing');
    }
}