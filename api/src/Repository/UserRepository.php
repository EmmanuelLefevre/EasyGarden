<?php

namespace App\Repository;

use App\Entity\User;
use App\Validator\EmailValidator;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;


class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    private $emailValidator;

    /**
     * UserRepository constructor.
     * @param EmailValidator $emailValidator The validator responsible for email validation.
     * @param ManagerRegistry $registry The ManagerRegistry instance used for database access.
     */
    public function __construct(EmailValidator $emailValidator,
                                ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
        $this->emailValidator = $emailValidator;
    }

     /**
     * Check if user exist in database on the provided email [UniqueEntity]
     * @param string $email The email to check
     * @return bool True if the email exists, false otherwise
     * @throws \InvalidArgumentException If the email format is invalid.
     */
    public function checkIfUserExist(string $email): bool
    {
        // Validate the email using validateEmail() private method
        $this->validateEmail($email);

        $user = $this->findOneBy(['email' => $email]);
        return $user !== null;
    }

    /**
     * Check if a user with the given email and isVerified = true exists.
     * @param string $email Email [UniqueEntity] of the user to look for.
     * @return bool True if the user exists and is verified, false otherwise.
     * @throws \InvalidArgumentException If the email format is invalid.
     */
    public function isUserVerified(string $email): bool
    {
        // Validate the email using validateEmail() private method
        $this->validateEmail($email);

        $user = $this->findOneBy(['email' => $email, 'isVerified' => true]);
        return $user !== null;
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

    /**
     * Find a user by email.
     * @param string $email The user's email.
     * @return User|null The user object or null if not found.
     * @throws \InvalidArgumentException If the email format is invalid.
     */
    public function findByEmail(string $email): ?User
    {
        // Validate the email using validateEmail() private method
        $this->validateEmail($email);

        return $this->findOneBy(['email' => $email]);
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
     * Validates the format of the email using EmailValidator.
     * @param string $email The email to validate.
     * @throws \InvalidArgumentException If the email format is invalid.
     */
    private function validateEmail(string $email): void
    {
        if (!$this->emailValidator->isValidEmail($email, null)) {
            throw new \InvalidArgumentException('Invalid email format');
        }
    }

}
