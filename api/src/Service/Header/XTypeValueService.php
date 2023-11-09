<?php

namespace App\Service\Header;

use Symfony\Component\HttpFoundation\RequestStack;


/**
 * Service for extracting the value of the 'X-Type' in header from the current HTTP request.
 * @package App\Service\Header
 */
class XTypeValueService
{
    private $requestStack;

    /**
     * XTypeValueService constructor.
     * @param RequestStack $requestStack The RequestStack instance.
     */
    public function __construct(RequestStack $requestStack)
    {
        $this->requestStack = $requestStack;
    }

    /**
     * Get the value of the 'X-Type' in header from the current HTTP request.
     * @return string The value of the 'X-Type' header if it exists.
     * @throws \Exception If the 'X-Type' in header is missing, throw an exception.
     */
    public function getXTypeValue(): string
    {
        $request = $this->requestStack->getCurrentRequest();

        if ($request) {
            $xType = $request->headers->get('X-Type');
            if ($xType !== null) {
                return $xType;
            }
        }

        throw new \Exception();
    }
}
