<?php

namespace App\DataPersister;

use App\Entity\User;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;

class UserDataPersister implements DataPersisterInterface 
{
    private $entityManager;
    private $userPasswordEncoder;

    public function __construct (EntityManagerInterface $entityManager, UserPasswordHasherInterface $userPasswordEncoder)
    {
        $this->entityManager = $entityManager;
        $this->userPasswordEncoder = $userPasswordEncoder;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof User;
    }

    /**
     * @param User $data
     */
    public function persist($data, array $context = [])
    {
        if ($data->getPlainPassword()) {
            $data->setPassword(
                $this->userPasswordEncoder->hashPassword($data, $data->getPlainPassword())
            );
            $data->eraseCredentials();
        }   
        $this->entityManager->persist($data);      
        $this->entityManager->flush();
    }

    public function remove($data, array $context = [])
    {
        $this->entityManager->remove($data);      
        $this->entityManager->flush();
    }
}