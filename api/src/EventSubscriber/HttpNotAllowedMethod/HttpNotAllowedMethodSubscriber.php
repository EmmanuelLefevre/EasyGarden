<?php

namespace App\EventSubscriber\HttpNotAllowedMethod;

use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;


/**
 * Class HttpNotAllowedMethodSubscriber
 * This class subscribes to the kernel.exception event to perform custom JsonResponse.
 * @package App\EventSubscriber\HttpNotAlloweMethod
 */
class HttpNotAllowedMethodSubscriber implements EventSubscriberInterface
{
    /**
     * Handle the kernel exception
     * @param ExceptionEvent $event The event when an not allowed method occurs.
     */
    public function onKernelException(ExceptionEvent $event)
    {
        $exception = $event->getThrowable();

        if ($exception instanceof MethodNotAllowedHttpException) {
            $response = new JsonResponse(['message' => 'This endpoint only supports specified HTTP methods.'], JsonResponse::HTTP_METHOD_NOT_ALLOWED);
            $event->setResponse($response);
        }
    }

    /**
     * Specifies the subscribed events and their priorities
     *
     * @return array The array of subscribed events
     */
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::EXCEPTION => ['onKernelException',EventPriorities::PRE_RESPOND]
        ];
    }

}