<?php

namespace App\Repository;

use App\Entity\Watering;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Watering|null find($id, $lockMode = null, $lockVersion = null)
 * @method Watering|null findOneBy(array $criteria, array $orderBy = null)
 * @method Watering[]    findAll()
 * @method Watering[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WateringRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Watering::class);
    }

    // /**
    //  * @return Watering[] Returns an array of Watering objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('w.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Watering
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
