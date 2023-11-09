<?php

namespace App\EventListener\JWT;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;


/**
 * Class JWTCreatedListener
 * This class listens to the JWTCreatedEvent event and modifies the token payload.
 * @package App\EventListener\JWT
 */
class JWTCreatedListener
{
  /**
   * Listen to the JWTCreatedEvent event and modify the token payload.
   * @param JWTCreatedEvent $event The JWTCreatedEvent object.
   * @return void
   */
  public function onJWTCreated(JWTCreatedEvent $event)
  {
      /** @var $user \AppBundle\Entity\User */
      $user = $event->getUser();

      // Merge with existing event data
      $payload = array_merge(
        $event->getData(),
        [
          'firstName' => $user->getFirstName()
        ],
        [
          'lastName' => $user->getLastName()
        ],
        [
          'id' => $user->getId()
        ]
      );

      $event->setData($payload);
  }
}