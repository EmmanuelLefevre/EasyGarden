<?php

namespace App\DataFixtures;

use Faker\Factory;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Config\FileLocator;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;


/**
 * Class LightningFixture
 * This class represents a fixture for populating the database with lightning data.
 * It creates lightning instances and associates them with specific gardens based on references.
 * @package App\DataFixtures
 */
class LightningFixture extends Fixture implements DependentFixtureInterface
{
    /**
     * Load lightning fixture data into the database.
     * @param ObjectManager $manager The object manager for interacting with the database.
     */
    public function load(ObjectManager $manager): void
    {
        $configDirectories = [__DIR__.''];
        $fileLocator = new FileLocator($configDirectories);
        $fileLocator->locate('FunctionsFixture.php', null, false);

        $faker = Factory::create('fr_FR');

        // Create Lightnings for Manu
        // LIGHTNINGS Saint-Savin
        for ($nbrLightnings=0; $nbrLightnings < 16; $nbrLightnings++) {
            $gardenUser1 = $this->getReference(gardenFixture::GARDEN1_REFERENCE);
            $lightning = new \App\Entity\Lightning();
            $lightning->setName(FunctionsFixture::lightningsData().' (Saint-Savin)');
            $lightning->setStatus(mt_rand(0, 1));
            $lightning->setGarden($gardenUser1);
            $manager->persist($lightning);
        }

        // LIGHTNINGS Cazaux
        $gardenUser2 = $this->getReference(gardenFixture::GARDEN2_REFERENCE);
        for ($nbrLightnings=0; $nbrLightnings < 12; $nbrLightnings++) {
            $lightning = new \App\Entity\Lightning();
            $lightning->setName(FunctionsFixture::lightningsData().' (Cazaux)');
            $lightning->setStatus(mt_rand(0, 1));
            $lightning->setGarden($gardenUser2);
            $manager->persist($lightning);
        }

        // Create Lightnings for Nicolas
        // LIGHTNINGS Angoulême
        $gardenUser3 = $this->getReference(gardenFixture::GARDEN3_REFERENCE);
        for ($nbrLightnings=0; $nbrLightnings < 6; $nbrLightnings++){
            $lightning = new \App\Entity\Lightning();
            $lightning->setName(FunctionsFixture::lightningsData());
            $lightning->setStatus(mt_rand(0, 1));
            $lightning->setGarden($gardenUser3);
            $manager->persist($lightning);
        }

        // Create Other Lightnings
        for ($nbrLightnings=0; $nbrLightnings < 100; $nbrLightnings++) {
            $garden = $this->getReference('garden_'.$faker->numberBetween(3, 39));
            $lightning = new \App\Entity\Lightning();
            $lightning->setName(FunctionsFixture::lightningsData().FunctionsFixture::stringWithParenthesis($garden->getName()));
            $lightning->setStatus(mt_rand(0, 1));
            $lightning->setGarden($garden);
            $manager->persist($lightning);
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