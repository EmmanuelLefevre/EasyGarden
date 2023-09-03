<?php

namespace App\Controller\Equipment;

use App\Entity\Lightning;
use App\Validator\Entity\StatusValidator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


/**
 * Class UpdateStatusController
 * This controller handles the status of equipments entities.
 * It provides endpoints for updating equipments entities status with validation using StatusValidator.
 * @package App\Controller\Equipment
 */
class UpdateStatusController extends AbstractController
{
    /**
     * @Route("/api/update_status/{id}", methods={"PUT"})
     */
    public function updateStatus(Request $request, StatusValidator $statusValidator)
    {
        // Get JSON request data

        // validate "status" field with StatusValidator
        $isValidStatus = $statusValidator->isValidStatus('status', true, $request);
        if ($isValidStatus !== true) {
          // Retourner une réponse d'erreur JSON si la validation échoue
            return $isValidStatus;
        }

        // Validate {id} parameter

        // Get HEADER type and call correct repository

        // Persist

        // Call Arduino => Open bluetooth connexion (if possible in SSH)

        // Return HTTP_OK (200) JSON Response ...
    }
}