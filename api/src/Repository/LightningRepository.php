<?php

namespace App\Repository;

use App\Entity\Lightning;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;


/**
 * Class LightningRepository
 * This class is responsible for managing lightning data and interactions with the database.
 * @package App\Repository
 */
class LightningRepository extends ServiceEntityRepository
{
    /**
     * LightningRepository constructor.
     * @param ManagerRegistry $registry The ManagerRegistry instance used for database access.
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Lightning::class);
    }

    /**
     * Find a lightning by id.
     * @param string $email The ligtning's id.
     * @return User|null The lightning object or null if not found.
     */
    public function findById(string $id): ?Lightning
    {
        return $this->findOneBy(['id' => $id]);
    }

    /**
     * Update lightning status
     * @param Lightning $lightning Lightning equipment to update.
     * @param bool $status New status
     * @throws UnsupportedUserException If the provided lightning object is not an instance of Lightning.
     */
    public function updateStatus(Lightning $lightning, bool $status): void
    {
        if (!$lightning instanceof Lightning) {
            throw new \InvalidArgumentException(sprintf('Instances of "%s" are not supported.', \get_class($lightning)));
        }

        $lightning->setStatus($status);
        $this->_em->persist($lightning);
        $this->_em->flush();
    }
    
}
