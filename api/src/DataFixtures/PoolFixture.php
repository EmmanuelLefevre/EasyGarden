<?php

namespace App\DataFixtures;

use Faker\Factory;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Config\FileLocator;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class PoolFixture extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $configDirectories = [__DIR__.''];
        $fileLocator = new FileLocator($configDirectories);
        $fileLocator->locate('FunctionsFixture.php', null, false);

        $faker = Factory::create('fr_FR');

        // Create Pools for Manu
        // POOLS Saint-Savin
        for ($nbrPools=0; $nbrPools < 12; $nbrPools++) {
            $gardenUser1 = $this->getReference(gardenFixture::GARDEN1_REFERENCE);
            $pool = new \App\Entity\Pool();
            $pool->setName(poolsData().' (Saint-Savin)');
            $pool->setStatus(mt_rand(0, 1));
            $pool->setGarden($gardenUser1);
            $manager->persist($pool);
        }

        // POOLS Cazaux
        for ($nbrPools=0; $nbrPools < 8; $nbrPools++) {
            $gardenUser2 = $this->getReference(gardenFixture::GARDEN2_REFERENCE);
            $pool = new \App\Entity\Pool();
            $pool->setName(poolsData().' (Cazaux)');
            $pool->setStatus(mt_rand(0, 1));
            $pool->setGarden($gardenUser2);
            $manager->persist($pool);
        }

        // Create Pools for Nicolas
        // POOLS Angoulême
        for ($nbrPools=0; $nbrPools < 6; $nbrPools++) {
            $gardenUser3 = $this->getReference(gardenFixture::GARDEN3_REFERENCE);
            $pool = new \App\Entity\Pool();
            $pool->setName(poolsData());
            $pool->setStatus(mt_rand(0, 1));
            $pool->setGarden($gardenUser3);
            $manager->persist($pool);
        }

        // Create Other Pools
        for ($nbrPools=0; $nbrPools < 70; $nbrPools++) {
            $garden = $this->getReference('garden_'.$faker->numberBetween(3, 39));
            $pool = new \App\Entity\Pool();
            $pool->setName(poolsData().stringWithParenthesis($garden->getName()));
            $pool->setStatus(mt_rand(0, 1));
            $pool->setGarden($garden);
            $manager->persist($pool);
        }
        $manager->flush();
    }

    public function getDependencies() 
    {
        return [
            GardenFixture::class
        ];
    }
}