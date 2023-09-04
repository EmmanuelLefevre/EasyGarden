<?php

namespace App\Repository;

use App\Entity\Lawnmower;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;


/**
 * Class LawnmowerRepository
 * This class is responsible for managing lawnmower data and interactions with the database.
 * @package App\Repository
 */
class LawnmowerRepository extends ServiceEntityRepository
{
    /**
     * LawnmowerRepository constructor.
     * @param ManagerRegistry $registry The ManagerRegistry instance used for database access.
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Lawnmower::class);
    }

        /**
     * Find a lawnmower by id.
     * @param string $email The lawnmower's id.
     * @return Lawnmower|null The lawnmower object or null if not found.
     */
    public function findById(string $id): ?Lawnmower
    {
        return $this->findOneBy(['id' => $id]);
    }

    /**
     * Update lawnmower status
     * @param Lawnmower $lawnmower Lawnmower equipment to update.
     * @param bool $status New status.
     * @throws UnsupportedLawnmowerException If the provided lawnmower object is not an instance of Lawnmower.
     */
    public function updateStatus(Lawnmower $lawnmower, bool $status): void
    {
        if (!$lawnmower instanceof Lawnmower) {
            throw new \InvalidArgumentException(sprintf('Instances of "%s" are not supported.', \get_class($lawnmower)));
        }

        $lawnmower->setStatus($status);
        $this->_em->persist($lawnmower);
        $this->_em->flush();
    }

}
