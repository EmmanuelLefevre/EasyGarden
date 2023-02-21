<?php

namespace App\Doctrine;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Garden;
use App\Entity\Lawnmower;
use App\Entity\Lightning;
use App\Entity\Pool;
use App\Entity\Portal;
use App\Entity\Watering;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;

/**
 * This extension makes sure normal users can only access their own Datas
 */
final class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    private $security;

    public function __construct(Security $security) {
        $this->security = $security;
    }

    public function applyToCollection(QueryBuilder $queryBuilder, 
                                      QueryNameGeneratorInterface $queryNameGenerator, 
                                      string $resourceClass, 
                                      string $operationName = null): void {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, 
                                QueryNameGeneratorInterface $queryNameGenerator, 
                                string $resourceClass, 
                                array $identifiers, 
                                string $operationName = null, 
                                array $context = []): void {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass): void {
        if ($this->security->isGranted('ROLE_ADMIN') 
            || null === $user = $this->security->getUser()) {
            return;
        }
        $rootAlias = $queryBuilder->getRootAliases()[0];
        
        switch ($resourceClass) {
            case Garden::class:
                $queryBuilder->andWhere(sprintf('%s.user = :current_user', $rootAlias))
                             ->setParameter('current_user', $user);
                break;

            case Lawnmower::class:
            case Lightning::class:
            case Pool::class:
            case Portal::class:
            case Watering::class:
                $gardenAlias = sprintf("%s_garden", $rootAlias);
                $queryBuilder->innerJoin(sprintf('%s.garden', $rootAlias), $gardenAlias)
                             ->andWhere(sprintf('%s.user = :current_user', $gardenAlias))
                             ->setParameter('current_user', $user);
                break;
        }
    }
}
