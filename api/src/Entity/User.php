<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read:User']],
    denormalizationContext: ['groups' => ['write:User']],
    paginationItemsPerPage: 100,
    itemOperations: ['check_account_validation' => [
                        'method' => 'GET',
                        'path' => '/check_account_validation',
                        'controller' => LoginController::class,
                        'openapi_context' => [
                            'summary' => 'Check if the user has validated his account.']],
                    'check_if_email_exist' => [
                        'method' => 'GET',
                        'path' => '/check_if_email_exist',
                        'controller' => LoginController::class,
                        'openapi_context' => [
                            'summary' => 'Check if email exist in database.']],
                    'account_creation' => [
                        'method' => 'POST',
                        'path' => '/account_creation',
                        'controller' => AccountCreationController::class,
                        'openapi_context' => [
                            'summary' => 'Create an account.']],
                    'account_activation' => [
                        'method' => 'GET',
                        'path' => '/account_activation/{token}',
                        'controller' => AccountCreationController::class,
                        'openapi_context' => [
                            'summary' => 'Activate account by providing a valid token.']]],
    collectionOperations: ['get' => ['normalization_context' => ['groups' => ['read:User']]],
                           'post' => ['denormalization_context' => ['groups']]],
    order: ['pseudo' => 'ASC'])]
#[ApiFilter(BooleanFilter::class, properties: ['isVerified'])]
#[ApiFilter(DateFilter::class, properties: ['createdAt' => DateFilter::EXCLUDE_NULL,
                                            'updatedAt' => DateFilter::EXCLUDE_NULL])]
#[ApiFilter(OrderFilter::class, properties: ['pseudo','email','firtName','lastName','phoneNumber'])]
#[ApiFilter(SearchFilter::class, properties: ['pseudo' => 'partial',
                                              'email' => 'partial',
                                              'firstname' => 'partial',
                                              'lastname' => 'partial',
                                              'phoneNumber' => 'exact'])]

#[UniqueEntity('email', message: "Email already exists!")]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:User'])]
    private $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Groups(['read:User',
              'write:User'])]
    private $email;

    #[ORM\Column(type: 'json')]
    #[Groups(['write:User'])]
    private $roles = [];

    #[ORM\Column(type: 'string', length: 45)]
    #[Groups(['read:User',
              'write:User'])]
    private $firstName;

    #[ORM\Column(type: 'string', length: 45)]
    #[Groups(['read:User',
              'write:User'])]
    private $lastName;

    #[SerializedName('password')]
    #[Assert\Length(max:50)]
    #[Groups(['write:User'])]
    private ?string $plainPassword = null;

    #[ORM\Column(type: 'string')]
    private $password;

    #[ORM\Column(type: 'string', length: 45)]
    #[Groups(['read:User',
              'write:User'])]
    private $pseudo;

    #[ORM\Column(type: 'string', length: 20)]
    #[Assert\Regex(
        pattern: '/\^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})\$/',
        match: true,
        message: 'Please fill out a valid french number!',
    )]
    #[Groups(['read:User',
              'write:User'])]
    private $phoneNumber;

    #[ORM\Column(type: 'datetime_immutable', options:['default' => 'CURRENT_TIMESTAMP'])]
    #[Groups(['read:User',
              'write:User'])]
    private $createdAt;

    #[ORM\Column(type: 'datetime', nullable: true)]
    #[Groups(['read:User',
              'write:User'])]
    private $updatedAt;

    #[ORM\Column(type: 'boolean', options:['default' => false])]
    #[Groups(['read:User',
              'write:User'])]
    private $isVerified;

    #[ORM\Column(type: 'string', length: 255)]
    private $activationToken;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Garden::class, orphanRemoval: true)]
    private $garden;

    public function __construct()
    {
        $this->garden = new ArrayCollection();
        $this->setRoles(['ROLE_USER']);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
    }

    public function getPseudo(): ?string
    {
        return $this->pseudo;
    }

    public function setPseudo(string $pseudo): self
    {
        $this->pseudo = $pseudo;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = new DateTimeImmutable();

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getIsVerified(): ?bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(bool $isVerified): self
    {
        $this->isVerified = $isVerified;
        
        return $this;
    }

    public function getActivationToken(): ?string
    {
        return $this->activationToken;
    }

    public function setActivationToken(?string $activationToken): self
    {
        $this->activationToken = $activationToken;

        return $this;
    }

    /**
     * @return Collection<int, Garden>
     */
    public function getGarden(): Collection
    {
        return $this->garden;
    }

    public function addGarden(Garden $garden): self
    {
        if (!$this->garden->contains($garden)) {
            $this->garden[] = $garden;
            $garden->setUser($this);
        }

        return $this;
    }

    public function removeGarden(Garden $garden): self
    {
        if ($this->garden->removeElement($garden)) {
            // set the owning side to null (unless already changed)
            if ($garden->getUser() === $this) {
                $garden->setUser(null);
            }
        }

        return $this;
    }

}
