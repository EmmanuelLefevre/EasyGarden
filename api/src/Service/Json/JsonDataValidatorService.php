<?php

namespace App\Service\Json;

use App\Utility\Json\JsonValidationException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


/**
 * Service responsible for validating the json format of the request.
 */
class JsonDataValidatorService
{
	/**
     * Validating json data from request.
     * @param Request $request The HTTP request object.
     * @param array $requiredKeys The required keys in the json data.
     * @return JsonResponse|array The validated JSON data or a JSON response in case of error.
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

        return $data;
    }
}