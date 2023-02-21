<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\DataFixtures\UserFixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Config\FileLocator;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class GardenFixture extends Fixture implements DependentFixtureInterface
{
    public const GARDEN1_REFERENCE = 'garden1_';
    public const GARDEN2_REFERENCE = 'garden2_';
    public const GARDEN3_REFERENCE = 'garden3_';

    public function load(ObjectManager $manager): void
    {
        $configDirectories = [__DIR__.''];
        $fileLocator = new FileLocator($configDirectories);
        $path = $fileLocator->locate('VillesFrance.json', null, true);

        $json = file_get_contents($path);
        $cities = json_decode($json, true);

        $faker = Factory::create('fr_FR');

        // Create Gardens for Manu
        // GARDEN Saint-Savin
        $user1 = $this->getReference(userFixture::USER1_REFERENCE);
        $gardenUser1 = new \App\Entity\Garden();
        $gardenUser1->setName('Saint-Savin');
        $gardenUser1->setUser($user1);
        $manager->persist($gardenUser1);
        $this->addReference(self::GARDEN1_REFERENCE , $gardenUser1);

        // GARDEN Cazaux
        $user1 = $this->getReference(userFixture::USER1_REFERENCE);
        $gardenUser2 = new \App\Entity\Garden();
        $gardenUser2->setName('Cazaux');
        $gardenUser2->setUser($user1);
        $manager->persist($gardenUser2);
        $this->addReference(self::GARDEN2_REFERENCE , $gardenUser2);

        // Create Garden for Nicolas
        // GARDEN Angoulême
        $user2 = $this->getReference(userFixture::USER2_REFERENCE);
        $gardenUser3 = new \App\Entity\Garden();
        $gardenUser3->setName('Angoulême');
        $gardenUser3->setUser($user2);
        $manager->persist($gardenUser3);
        $this->addReference(self::GARDEN3_REFERENCE , $gardenUser3);

        // Create Other Gardens
        for ($nbrGardens=0; $nbrGardens < 40; $nbrGardens++) {
            $user = $this->getReference('user_'.$faker->numberBetween(3, 69));
            $garden = new \App\Entity\Garden();
            $garden->setName(ucwords(strtolower($cities[array_rand($cities, 1)]['Nom_commune'])).' ('.$user->getPseudo().')');
            $garden->setUser($user);
            $manager->persist($garden);
            $this->addReference('garden_'.$nbrGardens , $garden);
            $manager->persist($garden);
        }
        $manager->flush();
    }

    public function getDependencies() 
    {
        return [
            UserFixture::class
        ];
    }
}