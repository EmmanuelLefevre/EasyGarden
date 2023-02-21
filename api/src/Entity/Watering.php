<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\WateringRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: WateringRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read:Watering']],
    denormalizationContext: ['groups' => ['write:Watering']],
    collectionOperations: ['get' => ['normalization_context' => ['groups' => ['read:Watering']]],
                           'post' => ['denormalization_context' => ['groups']]],
    order: ['status' => 'DESC'])]
#[ApiFilter(BooleanFilter::class, properties: ['status'])]
#[ApiFilter(OrderFilter::class, properties: ['name'])]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial'])]

class Watering
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:Watering'])]
    private $id;

    #[ORM\Column(type: 'string', length: 45)]
    #[Assert\NotBlank]
    #[Assert\Regex(
        pattern: '/\^[a-zA-ZàâäãçéèêëíìîïñôöõÀÂÄÃÇÉÈÊËÌÍÎÏÑÔÖÕ0-9][a-zàâäãçéèêëíìîïñôöõ]\+([-\'\s][a-zA-ZàâäãçéèêëíìîïñôöõÀÂÄÃÇÉÈÊËÌÍÎÏÑÔÖÕ0-9][a-zàâäãçéèêëíìîïñôöõ]\+)?/',
        match: false,
        message: 'The watering name cannot contain some special character',
    )]
    #[Assert\Regex(
        pattern: '/\w{3,20}\$/',
        match: false,
        message: 'The watering name should be between 3 and 20 characters',
    )]
    #[Groups(['read:Watering',
              'write:Watering'])]
    private $name;

    #[ORM\Column(type: 'string', length: 12, nullable:true)]
    #[Groups(['read:Watering',
              'write:Watering'])]
    private $flowSensor;

    #[ORM\Column(type: 'string', length: 12, nullable:true)]
    #[Groups(['read:Watering',
              'write:Watering'])]
    private $pressureSensor;

    #[ORM\Column(type: 'boolean', nullable:true)]
    #[Groups(['read:Watering',
              'write:Watering'])]
    private $status;

    #[ORM\JoinColumn(nullable: false)]
    #[ORM\ManyToOne(targetEntity: Garden::class, inversedBy: 'watering')]
    #[Groups(['read:Watering'])]
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

    public function getFlowSensor(): ?string
    {
        return $this->flowSensor;
    }

    public function setFlowSensor(string $flowSensor): self
    {
        $this->flowSensor = $flowSensor;

        return $this;
    }

    public function getPressureSensor(): ?string
    {
        return $this->pressureSensor;
    }

    public function setPressureSensor(string $pressureSensor): self
    {
        $this->pressureSensor = $pressureSensor;

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
