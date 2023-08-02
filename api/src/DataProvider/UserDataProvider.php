<?php

namespace App\DataProvider;

use App\Entity\User;
use App\Repository\UserRepository;
use ApiPlatform\Core\DataProvider\ContextAwareCollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\DenormalizedIdentifiersAwareItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;


final class UserDataProvider implements DenormalizedIdentifiersAwareItemDataProviderInterface, ContextAwareCollectionDataProviderInterface, RestrictedDataProviderInterface
{
    private $userRepository;
    private $tokenStorage;
    
    /**
     * UserDataProvider constructor.
     * @param UserRepository $userRepository The UserRepository instance.
     * @param TokenStorageInterface $tokenStorage The TokenStorageInterface instance.
     */
    public function __construct(UserRepository $userRepository, TokenStorageInterface $tokenStorage)
    {
        $this->userRepository = $userRepository;
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * Check if the data provider supports the given resource class.
     * @param string $resourceClass The resource class.
     * @param string|null $operationName The operation name.
     * @param array $context The context options. 
     * @return bool True if the resource class is supported, false otherwise.
     */
    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return User::class === $resourceClass;
    }
    
    /**
     * Get a collection of User entities.
     * @param string $resourceClass The resource class.
     * @param string|null $operationName The operation name.
     * @param array $context The context options. 
     * @return iterable|null A collection of User entities or null.
     */
    public function getCollection(string $resourceClass, string $operationName = null, array $context = []): iterable
    {
        $token = $this->tokenStorage->getToken();
        if (!$token) {
            if (array_key_exists('filters',$context)) {
                if (array_key_exists('email',$context['filters'])) {
                    if ($this->userRepository->findOneBy(['email'=>$context['filters']['email']])) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
            return null;
        }
        $user = $token->getUser();
        $roles = $user->getRoles();
        if ($user && in_array("ROLE_ADMIN", $roles)) {
            return $this->userRepository->findAll();
        }
        elseif ($user && in_array("ROLE_USER", $roles)) {
            return [$user];
        }
    }

    /**
     * Get a User entity by its identifier.
     * @param string $resourceClass The resource class.
     * @param mixed $id The identifier.
     * @param string|null $operationName The operation name.
     * @param array $context The context options. 
     * @return User|null The User entity or null if not found.
     */
    public function getItem(string $resourceClass, $id, string $operationName = null, array $context = []): ?User
    {
        $token = $this->tokenStorage->getToken();
        if (!$token) {
            return null;
        }
        $user = $token->getUser();
        return $user;
    }
}
