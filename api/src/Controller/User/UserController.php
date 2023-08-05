<?php

use App\Entity\User;
use App\Validator\Entity\EntityNameValidator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    /**
     * @Route("/api/users", methods={"POST"})
     */
    public function createUser(Request $request, EntityNameValidator $entityNameValidator)
    {
        // ... récupérer les données de la requête et créer une instance de l'entité User ...

        // Valider le champ "entityName" avec EntityNameValidator
        $isValidEntityName = $entityNameValidator->isValidName('entityName', true, $request);
        if ($isValidEntityName !== true) {
            return $isValidEntityName; // Retourner une réponse d'erreur JSON si la validation échoue
        }

        // ... enregistrer l'entité et retourner la réponse réussie ...
    }

    /**
     * @Route("/api/users", methods={"PUT"})
     */
    public function updateUser(Request $request, EntityNameValidator $entityNameValidator)
    {
        // ... récupérer les données de la requête et créer une instance de l'entité User ...

        // Valider le champ "entityName" avec EntityNameValidator
        $isValidEntityName = $entityNameValidator->isValidName('entityName', true, $request);
        if ($isValidEntityName !== true) {
            return $isValidEntityName; // Retourner une réponse d'erreur JSON si la validation échoue
        }

        // ... enregistrer l'entité et retourner la réponse réussie ...
    }
}