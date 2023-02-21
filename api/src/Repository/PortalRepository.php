<?php

namespace App\Repository;

use App\Entity\Portal;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Portal|null find($id, $lockMode = null, $lockVersion = null)
 * @method Portal|null findOneBy(array $criteria, array $orderBy = null)
 * @method Portal[]    findAll()
 * @method Portal[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PortalRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Portal::class);
    }

    // /**
    //  * @return Portal[] Returns an array of Portal objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Portal
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
