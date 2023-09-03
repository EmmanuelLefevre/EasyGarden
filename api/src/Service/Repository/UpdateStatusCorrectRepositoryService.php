<?php

namespace App\Service\Repository;

use App\Repository\LawnmowerRepository;
use App\Repository\LightningRepository;
use App\Repository\PoolRepository;
use App\Repository\PortalRepository;
use App\Repository\WateringRepository;


class UpdateStatusCorrectRepositoryService
{
    private $lawnmowerRepository;
    private $lightningRepository;
    private $poolRepository;
    private $portalRepository;
    private $wateringRepository;

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

    public function getCorrectRepositoryForUpdateStatus(string $xType)
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
            default:
                throw new \Exception('Unsupported X-Type header value');
        }
    }
}