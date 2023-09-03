<?php

namespace App\Repository;

use App\Entity\Portal;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;


/**
 * Class PortalRepository
 * This class is responsible for managing portal data and interactions with the database.
 * @package App\Repository
 */
class PortalRepository extends ServiceEntityRepository
{
    /**
     * PortalRepository constructor.
     * @param ManagerRegistry $registry The ManagerRegistry instance used for database access.
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Portal::class);
    }

    /**
     * Find a portal by id.
     * @param string $email The portal's id.
     * @return Portal|null The portal object or null if not found.
     */
    public function findById(string $id): ?Portal
    {
        return $this->findOneBy(['id' => $id]);
    }

    /**
     * Update portal status
     * @param Portal $portal Portal equipment to update.
     * @param bool $status New status
     * @throws UnsupportedPortalException If the provided portal object is not an instance of Portal.
     */
    public function updateStatus(Portal $portal, bool $status): void
    {
        if (!$portal instanceof Portal) {
            throw new \InvalidArgumentException(sprintf('Instances of "%s" are not supported.', \get_class($portal)));
        }

        $portal->setStatus($status);
        $this->_em->persist($portal);
        $this->_em->flush();
    }

}
