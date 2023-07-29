<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;


class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    /**
     * UserRepository constructor.
     * @param ManagerRegistry $registry The ManagerRegistry instance used for database access.
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     * @param PasswordAuthenticatedUserInterface|User $user The user object to upgrade the password for.
     * @param string $newHashedPassword The new hashed password to set for the user.
     * @throws UnsupportedUserException If the provided user object is not an instance of User.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
        }

        $user->setPassword($newHashedPassword);
        $this->_em->persist($user);
        $this->_em->flush();
    }

    /**
     * Check if user exist in database
     * @param string $email The email to check [UniqueEntity]
     * @return bool True if the email exists, false otherwise
     */
    public function checkIfUserExist(string $email): bool
    {
        $user = $this->findOneBy(['email' => $email]);
        return $user !== null;
    }

    /**
     * Check if a user with the given email and isVerified = true exists.
     * @param string $email Email [UniqueEntity] of the user to look for.
     * @return bool True if the user exists and is verified, false otherwise.
     */
    public function isUserVerified(string $email): bool
    {
        $user = $this->findOneBy(['email' => $email, 'isVerified' => true]);
        return $user !== null;
    }

    /**
     * Find a user by email.
     * @param string $email The user's email.
     * @return User|null The user object or null if not found.
     */
    public function findByEmail(string $email): ?User
    {
        return $this->findOneBy(['email' => $email]);
    }

    /**
     * Find a user by activation token.
     * @param string $activationToken The activation token.
     * @return User|null The user object or null if not found.
     */
    public function findByActivationToken(string $activationToken): ?User
    {
        return $this->findOneBy(['activationToken' => $activationToken]);
    }
}
