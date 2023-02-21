<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Config\FileLocator;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixture extends Fixture
{
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public const USER1_REFERENCE = 'user1_';
    public const USER2_REFERENCE = 'user2_';
    
    public function load(ObjectManager $manager): void
    {
        $configDirectories = [__DIR__.''];
        $fileLocator = new FileLocator($configDirectories);
        $fileLocator->locate('FunctionsFixture.php', null, false);

        $faker = Factory::create('fr_FR');

        // User ADMIN
        $admin = new User();
        $admin->setFirstName('prenomADMIN');
        $admin->setLastName('nomADMIN');
        $admin->setPseudo('pseudoADMIN');
        $admin->setPassword($this->hasher->hashPassword($admin,'xx'));
        $admin->setRoles(array('ROLE_ADMIN'));
        $admin->setEmail('admin@protonmail.fr');
        $admin->setPhoneNumber('05 12 25 48 71');
        $admin->setCreatedAt(new \DateTimeImmutable());
        $admin->setIsVerified(true);
        $manager->persist($admin);
       
        // User Manu
        $user1 = new User();
        $user1->setFirstName('Emmanuel');
        $user1->setLastName('Lefevre');
        $user1->setPseudo('Manu');
        $user1->setPassword($this->hasher->hashPassword($user1,'xx'));
        $user1->setRoles(['ROLE_USER']);
        $user1->setEmail('emmanuel@protonmail.com');
        $user1->setPhoneNumber('06 45 91 23 07');
        $user1->setCreatedAt(new \DateTimeImmutable());
        $user1->setIsVerified(true); 
        $manager->persist($user1);
        $this->addReference(self::USER1_REFERENCE , $user1);

        // User Nicolas
        $user2 = new User();
        $user2->setFirstName('Nicolas');
        $user2->setLastName('Clement');
        $user2->setPseudo('Nico');
        $user2->setPassword($this->hasher->hashPassword($user2,'Nico!33kzo'));
        $user2->setRoles(['ROLE_ADMIN']);
        $user2->setEmail('nico@gmail.com');
        $user2->setPhoneNumber('07 12 45 75 64');
        $user2->setCreatedAt(new \DateTimeImmutable());
        $user2->setIsVerified(true); 
        $manager->persist($user2);
        $this->addReference(self::USER2_REFERENCE , $user2);

        // Create Other Users
        for ($nbrUsers=0; $nbrUsers < 70; $nbrUsers++) {
            $user = new User();
            $user->setFirstName($fN=$faker->firstname());
            $user->setLastName($lN=$faker->lastname());
            $user->setPseudo($fN.mt_rand(0, 100));
            $user->setPassword($this->hasher->hashPassword($user, $faker->password()));
            $user->setRoles(['ROLE_USER']);
            $user->setEmail($fN.".".$lN.'@'.emailData());
            $user->setPhoneNumber($faker->mobileNumber());
            $user->setCreatedAt(new \DateTimeImmutable());
            $user->setIsVerified(mt_rand(0, 1));
            $manager->persist($user);
            $this->addReference('user_'.$nbrUsers , $user);
        }
        $manager->flush();
    }
}
