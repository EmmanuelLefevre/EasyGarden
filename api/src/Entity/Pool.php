<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\PoolRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: PoolRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read:Pool']],
    denormalizationContext: ['groups' => ['write:Pool']],
    collectionOperations: ['get' => ['normalization_context' => ['groups' => ['read:Pool']]],
                           'post' => ['denormalization_context' => ['groups']]],
    order: ['status' => 'DESC', 'name'])]
#[ApiFilter(BooleanFilter::class, properties: ['status'])]
#[ApiFilter(OrderFilter::class, properties: ['name'])]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial'])]

class Pool
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:Pool'])]
    private $id;

    #[ORM\Column(type: 'string', length: 45)]
    #[Assert\NotBlank]
    #[Groups(['read:Pool',
              'write:Pool'])]
    private $name;

    #[ORM\Column(type: 'boolean', nullable:true)]
    #[Groups(['read:Pool',
              'write:Pool'])]
    private $status;

    #[ORM\JoinColumn(nullable: false)]
    #[ORM\ManyToOne(targetEntity: Garden::class, inversedBy: 'pool')]
    #[Groups(['read:Pool'])]
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
