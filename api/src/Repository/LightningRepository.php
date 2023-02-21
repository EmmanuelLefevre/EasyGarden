<?php

namespace App\Repository;

use App\Entity\Lightning;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Lightning|null find($id, $lockMode = null, $lockVersion = null)
 * @method Lightning|null findOneBy(array $criteria, array $orderBy = null)
 * @method Lightning[]    findAll()
 * @method Lightning[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LightningRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Lightning::class);
    }

    // /**
    //  * @return Lightning[] Returns an array of Lightning objects
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
    public function findOneBySomeField($value): ?Lightning
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
