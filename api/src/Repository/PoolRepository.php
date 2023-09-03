<?php

namespace App\Repository;

use App\Entity\Pool;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;


/**
 * Class PoolRepository
 * This class is responsible for managing pool data and interactions with the database.
 * @package App\Repository
 */
class PoolRepository extends ServiceEntityRepository
{
    /**
     * PoolRepository constructor.
     * @param ManagerRegistry $registry The ManagerRegistry instance used for database access.
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Pool::class);
    }

    /**
     * Find a pool by id.
     * @param string $email The ligtning's id.
     * @return Pool|null The pool object or null if not found.
     */
    public function findById(string $id): ?Pool
    {
        return $this->findOneBy(['id' => $id]);
    }

    /**
     * Update pool status
     * @param Pool $pool Pool equipment to update.
     * @param bool $status New status
     * @throws UnsupportedPoolException If the provided pool object is not an instance of Pool.
     */
    public function updateStatus(Pool $pool, bool $status): void
    {
        if (!$pool instanceof Pool) {
            throw new \InvalidArgumentException(sprintf('Instances of "%s" are not supported.', \get_class($pool)));
        }

        $pool->setStatus($status);
        $this->_em->persist($pool);
        $this->_em->flush();
    }

}
