<?php

namespace App\DataPersister;

use App\Entity\User;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;


/**
 * Class UserDataPersister
 * This class is responsible for persisting (creating or updating) and removing User entities in the database.
 * @package App\DataPersister
 */
class UserDataPersister implements DataPersisterInterface
{
    private $entityManager;
    private $userPasswordHasher;

    /**
     * UserDataPersister constructor.
     * @param EntityManagerInterface $entityManager The EntityManagerInterface instance used for persisting entities.
     * @param UserPasswordHasherInterface $userPasswordHasher The UserPasswordHasherInterface instance used for hashing user passwords.
     */
    public function __construct (EntityManagerInterface $entityManager, UserPasswordHasherInterface $userPasswordHasher)
    {
        $this->entityManager = $entityManager;
        $this->userPasswordHasher = $userPasswordHasher;
    }

    /**
     * Check if the data is supported by this data persister.
     * @param mixed $data The data to check.
     * @param array $context The context options.
     * @return bool True if the data is supported, false otherwise.
     */
    public function supports($data, array $context = []): bool
    {
        return $data instanceof User;
    }

    /**
     * Persist (create or update) the User entity in the database.
     * @param User $data The User entity to persist.
     * @param array $context The context options.
     * @return void
     */
    public function persist($data, array $context = [])
    {
        if ($data->getPlainPassword()) {
            $data->setPassword(
                $this->userPasswordHasher->hashPassword($data, $data->getPlainPassword())
            );
            $data->eraseCredentials();
        }
        $this->entityManager->persist($data);
    }

    /**
     * Remove the User entity from the database.
     * @param User $data The User entity to remove.
     * @param array $context The context options.
     * @return void
     */
    public function remove($data, array $context = [])
    {
        $this->entityManager->remove($data);
        $this->entityManager->flush();
    }
}