<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\PortalRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: PortalRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read:Portal']],
    denormalizationContext: ['groups' => ['write:Portal']],
    collectionOperations: ['get' => ['normalization_context' => ['groups' => ['read:Portal']]],
                           'post' => ['denormalization_context' => ['groups']]],
    order: ['status' => 'DESC'])]
#[ApiFilter(BooleanFilter::class, properties: ['status','presenceSensor'])]
#[ApiFilter(OrderFilter::class, properties: ['name'])]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial'])]

class Portal
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:Portal'])]
    private $id;

    #[ORM\Column(type: 'string', length: 45)]
    #[Assert\NotBlank]
    #[Assert\Regex(
        pattern: '/\^[a-zA-ZàâäãçéèêëíìîïñôöõÀÂÄÃÇÉÈÊËÌÍÎÏÑÔÖÕ0-9][a-zàâäãçéèêëíìîïñôöõ]\+([-\'\s][a-zA-ZàâäãçéèêëíìîïñôöõÀÂÄÃÇÉÈÊËÌÍÎÏÑÔÖÕ0-9][a-zàâäãçéèêëíìîïñôöõ]\+)?/',
        match: false,
        message: 'The portal name cannot contain some special character',
    )]
    #[Assert\Regex(
        pattern: '/\w{3,20}\$/',
        match: false,
        message: 'The portal name should be between 3 and 20 characters',
    )]
    #[Groups(['read:Portal',
              'write:Portal'])]
    private $name;

    #[ORM\Column(type: 'boolean', nullable:true)]
    #[Groups(['read:Portal',
              'write:Portal'])]
    private $presenceSensor;

    #[ORM\Column(type: 'boolean', nullable:true)]
    #[Groups(['read:Portal',
              'write:Portal'])]
    private $status;

    #[ORM\JoinColumn(nullable: false)]
    #[ORM\ManyToOne(targetEntity: Garden::class, inversedBy: 'portal')]
    #[Groups(['read:Portal'])]
    private $garden;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPresenceSensor(): ?bool
    {
        return $this->presenceSensor;
    }

    public function setPresenceSensor(bool $presenceSensor): self
    {
        $this->presenceSensor = $presenceSensor;

        return $this;
    }

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getGarden(): ?Garden
    {
        return $this->garden;
    }

    public function setGarden(?Garden $garden): self
    {
        $this->garden = $garden;

        return $this;
    }
}
