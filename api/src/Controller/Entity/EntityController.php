<?php

namespace App\Controller\Entity;

use App\Entity\Garden;
use App\Validator\Entity\EntityNameValidator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


/**
 * Class EntityController
 * This controller handles the creation and updating of entities (gardens and equipments).
 * It provides endpoints for creating and updating entities with validation using EntityNameValidator.
 * @package App\Controller\Entity
 */
class EntityController extends AbstractController
{
    /**
     * @Route("/api/gardens", methods={"POST"})
     */
    public function createEntity(Request $request, EntityNameValidator $entityNameValidator)
    {
        // ... récupérer les données de la requête et créer une instance de l'entité Garden ...

        // Valider le champ "entityName" avec EntityNameValidator
        $isValidEntityName = $entityNameValidator->isValidEntityName('entityName', true, $request);
        if ($isValidEntityName !== true) {
            return $isValidEntityName; // Retourner une réponse d'erreur JSON si la validation échoue
        }

        // ... enregistrer l'entité et retourner la réponse réussie ...
    }

    /**
     * @Route("/api/gardens", methods={"PUT"})
     */
    public function updateEntity(Request $request, EntityNameValidator $entityNameValidator)
    {
        // ... récupérer les données de la requête et créer une instance de l'entité Garden ...

        // Valider le champ "entityName" avec EntityNameValidator
        $isValidEntityName = $entityNameValidator->isValidEntityName('entityName', true, $request);
        if ($isValidEntityName !== true) {
            return $isValidEntityName; // Retourner une réponse d'erreur JSON si la validation échoue
        }

        // ... enregistrer l'entité et retourner la réponse réussie ...
    }
}
