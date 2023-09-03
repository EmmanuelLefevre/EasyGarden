<?php

namespace App\Repository;

use App\Entity\Watering;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;


/**
 * Class WateringRepository
 * This class is responsible for managing watering data and interactions with the database.
 * @package App\Repository
 */
class WateringRepository extends ServiceEntityRepository
{
    /**
     * WateringRepository constructor.
     * @param ManagerRegistry $registry The ManagerRegistry instance used for database access.
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Watering::class);
    }

    /**
     * Find a watering by id.
     * @param string $email The watering's id.
     * @return Watering|null The watering object or null if not found.
     */
    public function findById(string $id): ?Watering
    {
        return $this->findOneBy(['id' => $id]);
    }

    /**
     * Update watering status
     * @param Watering $watering Watering equipment to update.
     * @param bool $status New status
     * @throws UnsupportedWateringException If the provided watering object is not an instance of Watering.
     */
    public function updateStatus(Watering $watering, bool $status): void
    {
        if (!$watering instanceof Watering) {
            throw new \InvalidArgumentException(sprintf('Instances of "%s" are not supported.', \get_class($watering)));
        }

        $watering->setStatus($status);
        $this->_em->persist($watering);
        $this->_em->flush();
    }

}
