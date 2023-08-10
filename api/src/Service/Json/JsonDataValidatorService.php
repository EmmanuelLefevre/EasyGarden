<?php

namespace App\Service\Json;

use App\Utility\Json\JsonValidationException;
use App\Validator\User\EmailValidator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


/**
 * Service responsible for validating the json format of the incoming request and performing additional validations.
 * @package App\Service\Json
 */
class JsonDataValidatorService
{
	private $emailValidator;

	/**
     * JsonDataValidatorService constructor.
     * @param EmailValidator $emailValidator The service for validating email.
     */
    public function __construct(EmailValidator $emailValidator)
    {
        $this->emailValidator = $emailValidator;
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

        return $data;
    }
}