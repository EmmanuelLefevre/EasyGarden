<?php

use App\Entity\User;
use App\Repository\UserRepository;
use App\Validator\User\EmailValidator;
use App\Validator\User\NameValidator;
use App\Validator\User\PhoneNumberValidator;
use App\Validator\User\PlainPasswordValidator;
use App\Validator\User\PseudoValidator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    private $emailValidator;
    private $nameValidator;
    private $phoneNumberValidator;
    private $plainPasswordValidator;
    private $pseudoValidator;
    private $userRepository;

    /**
     * UserController constructor.
     * @param EmailValidator $emailValidator The validator responsible for email validation.
     * @param NameValidator $nameValidator The validator responsible for name validation.
     * @param PhoneNumberValidator $phoneNumberValidator The validator responsible for phone number validation.
     * @param PlainPasswordValidator $plainPasswordValidator The validator responsible for plain password validation.
     * @param PseudoValidator $pseudoValidator The validator responsible for pseudovalidator validation.
     * @param UserRepository $userRepository The repository responsible for retrieving User data.
     */
    public function __construct(EmailValidator $emailValidator,
                                NameValidator $nameValidator,
                                PhoneNumberValidator $phoneNumberValidator,
                                PlainPasswordValidator $plainPasswordValidator,
                                PseudoValidator $pseudoValidator,
                                UserRepository $userRepository)
    {
        $this->emailValidator = $emailValidator;
        $this->nameValidator = $nameValidator;
        $this->phoneNumberValidator = $phoneNumberValidator;
        $this->plainPasswordValidator = $plainPasswordValidator;
        $this->pseudoValidator = $pseudoValidator;
        $this->userRepository = $userRepository;
    }

    /**
     * @Route("/api/users/{id}", methods={"PUT"})
     */
    // public function updateUser( Request $request): Jsonresponse
    // {
    //     $data = json_decode($request->getContent(), true);

    //     // Validate email with emailValidator
    //     $isValidEmail = $emailValidator->isValidEmail($paramName, true, $request);
    //     if ($isValidEmail !== true) {
    //         // Return JsonResponse on validation failure
    //         return $isValidEmail;
    //     }

    //     // ... enregistrer l'entité et retourner la réponse réussie ...
    // }

    /**
     * @Route("/api/users/{id}", methods={"PUT"})
     */
    // public function updateUser(Request $request)
    // {
    //     // ... récupérer les données de la requête et créer une instance de l'entité User ...

    //     // Valider le champ "entityName" avec EntityNameValidator
    //     $isValidEntityName = $entityNameValidator->isValidName('entityName', true, $request);
    //     if ($isValidEntityName !== true) {
    //         return $isValidEntityName; // Retourner une réponse d'erreur JSON si la validation échoue
    //     }

    //     // ... enregistrer l'entité et retourner la réponse réussie ...
    // }

    /**
     * Update a User resource with PUT method.
     *
     * @Route("/api/users/{id}", methods={"PUT"})
     */
    // public function update(User $user): Response
    // {
    //     // Implement the logic to update the user based on the request data
    //     // You can access the request data using $this->getRequest()->getContent()
    //     // and then update the user entity and persist it to the database.

    //     return $this->json(['message' => 'User updated successfully']);
    // }

    /**
     * Partially update a User resource with PATCH method.
     *
     * @Route("/api/users/{id}", methods={"PATCH"})
     */
    // public function partialUpdate(User $user): Response
    // {
    //     // Implement the logic to partially update the user based on the request data
    //     // You can access the request data using $this->getRequest()->getContent()
    //     // and then update specific fields of the user entity and persist it to the database.

    //     return $this->json(['message' => 'User partially updated successfully']);
    // }

    /**
     * Delete a User resource with DELETE method.
     *
     * @Route("/api/users/{id}", methods={"DELETE"})
     */
    // public function delete(User $user): Response
    // {
    //     // Implement the logic to delete the user from the database.

    //     return $this->json(['message' => 'User deleted successfully']);
    // }
}

