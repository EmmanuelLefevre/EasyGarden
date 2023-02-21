<?php

namespace App\DataFixtures;

use Faker\Factory;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Config\FileLocator;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class LawnmowerFixture extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $configDirectories = [__DIR__.''];
        $fileLocator = new FileLocator($configDirectories);
        $fileLocator->locate('FunctionsFixture.php', null, false);

        $faker = Factory::create('fr_FR');
        
        // Create Lawnmowers for Manu
        //LAWNMOWER Saint-Savin
        $gardenUser1 = $this->getReference(gardenFixture::GARDEN1_REFERENCE);
        $lawnmower1 = new \App\Entity\Lawnmower();
        $lawnmower1->setName('Tondeuse (Saint-Savin)');
        $lawnmower1->setBatterySensor(random_int(0, 100)."%");
        $lawnmower1->setStatus(mt_rand(0, 1));
        $lawnmower1->setGarden($gardenUser1);
        $manager->persist($lawnmower1);

        // LAWNMOWER Cazaux
        $gardenUser2 = $this->getReference(gardenFixture::GARDEN2_REFERENCE);
        $lawnmower2 = new \App\Entity\Lawnmower();
        $lawnmower2->setName('Tondeuse (Cazaux)');
        $lawnmower2->setBatterySensor(random_int(0, 100)."%");
        $lawnmower2->setStatus(mt_rand(0, 1));
        $lawnmower2->setGarden($gardenUser2);
        $manager->persist($lawnmower2);

        // Create Lawnmower for Nicolas
        // LAWNMOWER Angoulême
        $gardenUser3 = $this->getReference(gardenFixture::GARDEN3_REFERENCE);
        $lawnmower3 = new \App\Entity\Lawnmower();
        $lawnmower3->setName('Tondeuse');
        $lawnmower3->setBatterySensor(random_int(0, 100)."%");
        $lawnmower3->setStatus(mt_rand(0, 1));
        $lawnmower3->setGarden($gardenUser3);
        $manager->persist($lawnmower3);

        // Create Other Lawnmowers
        for ($nbrLawnmowers=0; $nbrLawnmowers < 15; $nbrLawnmowers++) {
            $garden = $this->getReference('garden_'.$faker->unique()->numberBetween(3, 39));
            $lawnmower = new \App\Entity\Lawnmower();
            $lawnmower->setName('Tondeuse '.stringWithoutParenthesis($garden->getName()));
            $lawnmower->setBatterySensor(random_int(0, 100)."%");
            $lawnmower->setStatus(mt_rand(0, 1));
            $lawnmower->setGarden($garden);
            $manager->persist($lawnmower);
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