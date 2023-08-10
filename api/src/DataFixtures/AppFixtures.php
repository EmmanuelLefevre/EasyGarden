<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;


/**
 * Class AppFixtures
 * This class serves as a base for loading initial data fixtures into the database.
 * It provides a starting point for creating and managing fixture data.
 * @package App\DataFixtures
 */
class AppFixtures extends Fixture
{
    /**
     * Load initial data fixtures into the database.
     * @param ObjectManager $manager The object manager for interacting with the database.
     */
    public function load(ObjectManager $manager): void
    {
        $manager->flush();
    }

}
