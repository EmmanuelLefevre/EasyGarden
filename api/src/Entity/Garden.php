<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\GardenRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: GardenRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read:Garden']],
    denormalizationContext: ['groups' => ['write:Garden']],
    collectionOperations: ['get' => ['normalization_context' => ['groups' => ['read:Garden']]],
                           'post' => ['denormalization_context' => ['groups']]],
    order: ['name' => 'ASC'])]
#[ApiFilter(OrderFilter::class, properties: ['name'])]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial'])]

class Garden
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:Garden',
              'read:Lawnmower',
              'read:Lightning',
              'read:Pool',
              'read:Portal',
              'read:Watering'])]
    private $id;

    #[ORM\Column(type: 'string', length: 45, nullable: true)]
    #[Assert\NotBlank]
    #[Groups(['read:Garden',
              'write:Garden'])]
    private $name;

    #[ORM\JoinColumn(nullable: false)]
    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'garden')]
    private $user;

    #[ORM\OneToMany(mappedBy: 'garden', targetEntity: Lawnmower::class, orphanRemoval: true)]
    private $lawnmower;

    #[ORM\OneToMany(mappedBy: 'garden', targetEntity: Lightning::class, orphanRemoval: true)]
    private $lightning;

    #[ORM\OneToMany(mappedBy: 'garden', targetEntity: Pool::class, orphanRemoval: true)]
    private $pool;

    #[ORM\OneToMany(mappedBy: 'garden', targetEntity: Portal::class, orphanRemoval: true)]
    private $portal;

    #[ORM\OneToMany(mappedBy: 'garden', targetEntity: Watering::class, orphanRemoval: true)]
    private $watering;

    public function __construct()
    {
        $this->lawnmower = new ArrayCollection();
        $this->lightning = new ArrayCollection();
        $this->pool = new ArrayCollection();
        $this->portal = new ArrayCollection();
        $this->watering = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function __toString()
    {
        return $this->user;
    }

    /**
     * @return Collection<int, Lawnmower>
     */
    public function getLawnmower(): Collection
    {
        return $this->lawnmower;
    }

    public function addLawnmower(Lawnmower $lawnmower): self
    {
        if (!$this->lawnmower->contains($lawnmower)) {
            $this->lawnmower[] = $lawnmower;
            $lawnmower->setGarden($this);
        }

        return $this;
    }

    public function removeLawnmower(Lawnmower $lawnmower): self
    {
        if ($this->lawnmower->removeElement($lawnmower)) {
            // set the owning side to null (unless already changed)
            if ($lawnmower->getGarden() === $this) {
                $lawnmower->setGarden(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Lightning>
     */
    public function getLightning(): Collection
    {
        return $this->lightning;
    }

    public function addLightning(Lightning $lightning): self
    {
        if (!$this->lightning->contains($lightning)) {
            $this->lightning[] = $lightning;
            $lightning->setGarden($this);
        }

        return $this;
    }

    public function removeLightning(Lightning $lightning): self
    {
        if ($this->lightning->removeElement($lightning)) {
            // set the owning side to null (unless already changed)
            if ($lightning->getGarden() === $this) {
                $lightning->setGarden(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Pool>
     */
    public function getPool(): Collection
    {
        return $this->pool;
    }

    public function addPool(Pool $pool): self
    {
        if (!$this->pool->contains($pool)) {
            $this->pool[] = $pool;
            $pool->setGarden($this);
        }

        return $this;
    }

    public function removePool(Pool $pool): self
    {
        if ($this->pool->removeElement($pool)) {
            // set the owning side to null (unless already changed)
            if ($pool->getGarden() === $this) {
                $pool->setGarden(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Portal>
     */
    public function getPortal(): Collection
    {
        return $this->portal;
    }

    public function addPortal(Portal $portal): self
    {
        if (!$this->portal->contains($portal)) {
            $this->portal[] = $portal;
            $portal->setGarden($this);
        }

        return $this;
    }

    public function removePortal(Portal $portal): self
    {
        if ($this->portal->removeElement($portal)) {
            // set the owning side to null (unless already changed)
            if ($portal->getGarden() === $this) {
                $portal->setGarden(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Watering>
     */
    public function getWatering(): Collection
    {
        return $this->watering;
    }

    public function addWatering(Watering $watering): self
    {
        if (!$this->watering->contains($watering)) {
            $this->watering[] = $watering;
            $watering->setGarden($this);
        }

        return $this;
    }

    public function removeWatering(Watering $watering): self
    {
        if ($this->watering->removeElement($watering)) {
            // set the owning side to null (unless already changed)
            if ($watering->getGarden() === $this) {
                $watering->setGarden(null);
            }
        }

        return $this;
    }
}
