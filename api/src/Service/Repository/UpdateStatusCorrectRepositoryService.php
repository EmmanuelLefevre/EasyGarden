<?php

namespace App\Service\Repository;

use App\Repository\LawnmowerRepository;
use App\Repository\LightningRepository;
use App\Repository\PoolRepository;
use App\Repository\PortalRepository;
use App\Repository\WateringRepository;


/**
 * Service responsible for retrieving the correct repository for status update based on type.
 * @package App\Service\Repository
 */
class UpdateStatusCorrectRepositoryService
{
    private $lawnmowerRepository;
    private $lightningRepository;
    private $poolRepository;
    private $portalRepository;
    private $wateringRepository;

    /**
     * UpdateStatusCorrectRepositoryService construtor.
     * @param LawnmowerRepository $lawnmowerRepository The repository for lawnmowers.
     * @param LightningRepository $lightningRepository The repository for lightningss.
     * @param PoolRepository $poolRepository The repository for pools.
     * @param PortalRepository $portalRepository The repository for portals.
     * @param WateringRepository $wateringRepository The repository for waterings.
     */
    public function __construct(LawnmowerRepository $lawnmowerRepository,
                                LightningRepository $lightningRepository,
                                PoolRepository $poolRepository,
                                PortalRepository $portalRepository,
                                WateringRepository $wateringRepository) 
    {
        $this->lawnmowerRepository = $lawnmowerRepository;
        $this->lightningRepository = $lightningRepository;
        $this->poolRepository = $poolRepository;
        $this->portalRepository = $portalRepository;
        $this->wateringRepository = $wateringRepository;
    }

    /**
     * Retrieves the appropriate repository for status updating based on X-Type.
     * @param string $xType The type to get the repository for.
     * @return object The repository object matching the specified type.
     */
    public function getCorrectRepositoryForUpdateStatus(string $xType): Object
    {
        switch ($xType) {
            case 'lawnmower':
                return $this->lawnmowerRepository;
            case 'lightning':
                return $this->lightningRepository;
            case 'pool':
                return $this->poolRepository;
            case 'portal':
                return $this->portalRepository;
            case 'watering':
                return $this->wateringRepository;
        }
    }
}