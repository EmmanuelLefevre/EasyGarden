<?php

namespace App\Repository;

use App\Entity\Lawnmower;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Lawnmower|null find($id, $lockMode = null, $lockVersion = null)
 * @method Lawnmower|null findOneBy(array $criteria, array $orderBy = null)
 * @method Lawnmower[]    findAll()
 * @method Lawnmower[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LawnmowerRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Lawnmower::class);
    }

    // /**
    //  * @return Lawnmower[] Returns an array of Lawnmower objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Lawnmower
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
