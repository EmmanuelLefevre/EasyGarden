<?php

namespace App\Service\Json;

use App\Utility\Json\JsonValidationException;
use App\Validator\User\EmailValidator;
use App\Validator\Entity\EntityNameValidator;
use App\Validator\User\NameValidator;
use App\Validator\User\PhoneNumberValidator;
use App\Validator\User\PlainPasswordValidator;
use App\Validator\User\PseudoValidator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


/**
 * Service responsible for validating the json format of the incoming request and performing additional validations.
 * @package App\Service\Json
 */
class JsonDataValidatorService
{
	private $emailValidator;
    private $entityNameValidator;
    private $nameValidator;
    private $phoneNumberValidator;
    private $plainPasswordValidator;
    private $pseudoValidator;

	/**
     * JsonDataValidatorService constructor.
     * @param EmailValidator $emailValidator The service for validating email.
     * @param EntityNameValidator $entityNameValidator The service for validating entity name.
     * @param NameValidator $nameValidator The service for validating user name.
     * @param PhoneNumberValidator $phoneNumberValidator The service for validating phone number.
     * @param PlainPasswordValidator $plainPasswordValidator The service for validating plain password.
     * @param PseudoValidator $pseudoValidatorpseudoValidator The service for validating pseudo.
     */
    public function __construct(EmailValidator $emailValidator,
                                EntityNameValidator $entityNameValidator,
                                NameValidator $nameValidator,
                                PhoneNumberValidator $phoneNumberValidator,
                                PlainPasswordValidator $plainPasswordValidator,
                                PseudoValidator $pseudoValidator)
    {
        $this->emailValidator = $emailValidator;
        $this->entityNameValidator = $entityNameValidator;
        $this->nameValidator = $nameValidator;
        $this->phoneNumberValidator = $phoneNumberValidator;
        $this->plainPasswordValidator = $plainPasswordValidator;
        $this->pseudoValidator = $pseudoValidator;
    }

	/**
     * Validating json data from request.
     * @param Request $request The HTTP request object.
     * @param array $requiredKeys The required keys in the json data.
     * @return JsonResponse|array The validated JSON data or a JSON response in case of error.
	 * @throws JsonValidationException If the JSON data is invalid or required keys are missing or empty.
	 */
    public function validateJsonData(Request $request, array $requiredKeys): JsonResponse|array
    {
        $data = json_decode($request->getContent(), true);

		// Check if json data is empty or not an array
        if (empty($data) || !is_array($data)) {
			throw new JsonValidationException('Invalid JSON!');
        }

		// Check the presence of required keys and if their fields are empty
        foreach ($requiredKeys as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
				throw new JsonValidationException('Missing required key or empty field!');
			}
        }

		// Validate email if present
        if (isset($data['email'])) {
            $isValidEmail = $this->emailValidator->isValidEmail($data['email'], true);
            if ($isValidEmail instanceof JsonResponse) {
                throw new JsonValidationException($isValidEmail->getContent());
            }
        }

        // Validate plain password if present
        if (isset($data['plainPassword'])) {
            $isValidPlainPassword = $this->plainPasswordValidator->isValidPlainPassword($data['plainPassword'], true);
            if ($isValidPlainPassword instanceof JsonResponse) {
                throw new JsonValidationException($isValidPlainPassword->getContent());
            }
        }

        // Validate user lastName if present
        if (isset($data['lastName'])) {
            $isValidName = $this->nameValidator->isValidName($data['lastName'], true);
            if ($isValidName instanceof JsonResponse) {
                throw new JsonValidationException($isValidName->getContent());
            }
        }

        // Validate user firstName if present
        if (isset($data['firstName'])) {
            $isValidName = $this->nameValidator->isValidName($data['firstName'], true);
            if ($isValidName instanceof JsonResponse) {
                throw new JsonValidationException($isValidName->getContent());
            }
        }

        // Validate user pseudo if present
        if (isset($data['pseudo'])) {
            $isValidPseudo = $this->pseudoValidator->isValidPseudo($data['pseudo'], true);
            if ($isValidPseudo instanceof JsonResponse) {
                throw new JsonValidationException($isValidPseudo->getContent());
            }
        }

        // Validate phone number if present
        if (isset($data['phoneNumber'])) {
            $isValidPhoneNumber = $this->phoneNumberValidator->isValidPhoneNumber($data['phoneNumber'], true);
            if ($isValidPhoneNumber instanceof JsonResponse) {
                throw new JsonValidationException($isValidPhoneNumber->getContent());
            }
        }

        // Validate entity name if present
        if (isset($data['name'])) {
            $isValidEntityName = $this->entityNameValidator->isValidEntityName($data['name'], true);
            if ($isValidEntityName instanceof JsonResponse) {
                throw new JsonValidationException($isValidEntityName->getContent());
            }
        }

        return $data;
    }
}