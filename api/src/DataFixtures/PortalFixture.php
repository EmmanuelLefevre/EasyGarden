<?php

namespace App\DataFixtures;

use Faker\Factory;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Config\FileLocator;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;


/**
 * Class PortalFixture
 * This class represents a fixture for populating the database with portal data.
 * It creates portal instances and associates them with specific gardens based on references.
 * @package App\DataFixtures
 */
class PortalFixture extends Fixture implements DependentFixtureInterface
{
    /**
     * Load portal fixture data into the database.
     * @param ObjectManager $manager The object manager for interacting with the database.
     */
    public function load(ObjectManager $manager): void
    {   
        $configDirectories = [__DIR__.''];
        $fileLocator = new FileLocator($configDirectories);
        $fileLocator->locate('FunctionsFixture.php', null, false);

        $faker = Factory::create('fr_FR');

        // Create Portals for Manu
        //PORTAL Saint-Savin
        $gardenUser1 = $this->getReference(gardenFixture::GARDEN1_REFERENCE);
        $portal1 = new \App\Entity\Portal();
        $portal1->setName('Portail (Saint-Savin)');
        $portal1->setPresenceSensor(1);
        $portal1->setStatus(mt_rand(0, 1));
        $portal1->setGarden($gardenUser1);
        $manager->persist($portal1);
    
        // PORTAL Cazaux
        $gardenUser2 = $this->getReference(gardenFixture::GARDEN2_REFERENCE);
        $portal2 = new \App\Entity\Portal();
        $portal2->setName('Portail (Cazaux)');
        $portal2->setPresenceSensor(mt_rand(0, 1));
        $portal2->setStatus(mt_rand(0, 1));
        $portal2->setGarden($gardenUser2);
        $manager->persist($portal2);
    
        // Create Portal for Nicolas
        // PORTAL Angoulême
        $gardenUser3 = $this->getReference(gardenFixture::GARDEN3_REFERENCE);
        $portal3 = new \App\Entity\Portal();
        $portal3->setName('Portail');
        $portal3->setPresenceSensor(mt_rand(0, 1));
        $portal3->setStatus(mt_rand(0, 1));
        $portal3->setGarden($gardenUser3); 
        $manager->persist($portal3);

        // Create Other Portals
        for ($nbrPortals=0; $nbrPortals < 15 ; $nbrPortals++) {
            $garden = $this->getReference('garden_'.$faker->unique()->numberBetween(3, 39));
            $portal = new \App\Entity\Portal();
            $portal->setName('Portail '.FunctionsFixture::stringWithoutParenthesis($garden->getName()));
            $portal->setPresenceSensor(mt_rand(0, 1));
            $portal->setStatus(mt_rand(0, 1));
            $portal->setGarden($garden);
            $manager->persist($portal);
        }
        $manager->flush();
    }

    /**
     * Get the dependencies of the current fixture.
     * @return array An array of dependent fixture classes.
     */
    public function getDependencies() 
    {
        return [
            GardenFixture::class
        ];
    }
}