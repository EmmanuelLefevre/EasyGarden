<?php

namespace App\Service\Json;

use App\Utility\Json\JsonValidationException;
use App\Validator\Entity\BatterySensorValidator;
use App\Validator\Entity\EntityNameValidator;
use App\Validator\Entity\FlowSensorValidator;
use App\Validator\Entity\PresenceSensorValidator;
use App\Validator\Entity\PressureSensorValidator;
use App\Validator\Entity\StatusValidator;
use App\Validator\Entity\URIValidator;
use App\Validator\User\EmailValidator;
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
    private $batterySensorValidator;
	private $emailValidator;
    private $entityNameValidator;
    private $flowSensorValidator;
    private $nameValidator;
    private $phoneNumberValidator;
    private $plainPasswordValidator;
    private $presenceSensorValidator;
    private $pressureSensorValidator;
    private $pseudoValidator;
    private $statusValidator;
    private $URIValidator;

	/**
     * JsonDataValidatorService constructor.
     * @param BatterySensorValidator $batterySensorValidator The service for validating battery sensor.
     * @param EmailValidator $emailValidator The service for validating email.
     * @param EntityNameValidator $entityNameValidator The service for validating entity name.
     * @param FlowSensorValidator $flowSensorValidator The service for validating flow sensor.
     * @param NameValidator $nameValidator The service for validating user name.
     * @param PhoneNumberValidator $phoneNumberValidator The service for validating phone number.
     * @param PlainPasswordValidator $plainPasswordValidator The service for validating plain password.
     * @param PresenceSensorValidator $presenceSensorValidator The service for validating presence sensor.
     * @param PressureSensorValidator $pressureSensorValidator The service for validating pressure sensor.
     * @param PseudoValidator $pseudoValidator The service for validating pseudo.
     * @param StatusValidator $statusValidator The service for validating status.
     * @param URIValidator $URIValidator The service for validating URI.
     */
    public function __construct(BatterySensorValidator $batterySensorValidator,
                                EmailValidator $emailValidator,
                                EntityNameValidator $entityNameValidator,
                                FlowSensorValidator $flowSensorValidator,
                                NameValidator $nameValidator,
                                PhoneNumberValidator $phoneNumberValidator,
                                PlainPasswordValidator $plainPasswordValidator,
                                PresenceSensorValidator $presenceSensorValidator,
                                PressureSensorValidator $pressureSensorValidator,
                                PseudoValidator $pseudoValidator,
                                StatusValidator $statusValidator,
                                URIValidator $URIValidator)
    {
        $this->batterySensorValidator = $batterySensorValidator;
        $this->emailValidator = $emailValidator;
        $this->entityNameValidator = $entityNameValidator;
        $this->flowSensorValidator = $flowSensorValidator;
        $this->nameValidator = $nameValidator;
        $this->phoneNumberValidator = $phoneNumberValidator;
        $this->plainPasswordValidator = $plainPasswordValidator;
        $this->presenceSensorValidator = $presenceSensorValidator;
        $this->pressureSensorValidator = $pressureSensorValidator;
        $this->pseudoValidator = $pseudoValidator;
        $this->statusValidator = $statusValidator;
        $this->URIValidator = $URIValidator;
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

        // Validate user lastname if present
        $this->validateName('lastName', $data, true);

        // Validate user firstname if present
        $this->validateName('firstName', $data, true);

        // // Validate user lastName if present
        // if (isset($data['lastName'])) {
        //     $isValidName = $this->nameValidator->isValidName($data['lastName'], true);
        //     if ($isValidName instanceof JsonResponse) {
        //         throw new JsonValidationException($isValidName->getContent());
        //     }
        // }

        // // Validate user firstName if present
        // if (isset($data['firstName'])) {
        //     $isValidName = $this->nameValidator->isValidName($data['firstName'], true);
        //     if ($isValidName instanceof JsonResponse) {
        //         throw new JsonValidationException($isValidName->getContent());
        //     }
        // }

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

        // Validate battery sensor if present
        if (isset($data['batterySensor'])) {
            $isValidBatterySensor = $this->batterySensorValidator->isValidBatterySensor($data['batterySensor'], true);
            if ($isValidBatterySensor instanceof JsonResponse) {
                throw new JsonValidationException($isValidBatterySensor->getContent());
            }
        }

        // Validate flow sensor if present
        if (isset($data['flowSensor'])) {
            $isValidFlowSensor = $this->flowSensorValidator->isValidFlowSensor($data['flowSensor'], true);
            if ($isValidFlowSensor instanceof JsonResponse) {
                throw new JsonValidationException($isValidFlowSensor->getContent());
            }
        }

        // Validate presence sensor if present
        if (isset($data['presenceSensor'])) {
            $isValidPresenceSensor = $this->presenceSensorValidator->isValidPresenceSensor($data['presenceSensor'], true);
            if ($isValidPresenceSensor instanceof JsonResponse) {
                throw new JsonValidationException($isValidPresenceSensor->getContent());
            }
        }

        // Validate pressure sensor if present
        if (isset($data['pressureSensor'])) {
            $isValidPressureSensor = $this->pressureSensorValidator->isValidPressureSensor($data['pressureSensor'], true);
            if ($isValidPressureSensor instanceof JsonResponse) {
                throw new JsonValidationException($isValidPressureSensor->getContent());
            }
        }

        // Validate status if present
        if (isset($data['status'])) {
            $isValidStatus = $this->statusValidator->isValidStatus($data['status'], true);
            if ($isValidStatus instanceof JsonResponse) {
                throw new JsonValidationException($isValidStatus->getContent());
            }
        }

        // Validate URI garden if present
        $this->validateURI('garden', $data, true);

        // Validate URI user if present
        $this->validateURI('user', $data, true);

        // // Validate URI garden if present
        // if (isset($data['garden'])) {
        //     $isValidURI = $this->URIValidator->isValidURI($data['garden'], true);
        //     if ($isValidURI instanceof JsonResponse) {
        //         throw new JsonValidationException($isValidURI->getContent());
        //     }
        // }

        // // Validate URI user if present
        // if (isset($data['user'])) {
        //     $isValidURI = $this->URIValidator->isValidURI($data['user'], true);
        //     if ($isValidURI instanceof JsonResponse) {
        //         throw new JsonValidationException($isValidURI->getContent());
        //     }
        // }

        return $data;
    }

    /**
     * Validation method for URI data.
     * @param string $paramName The name of the URI parameter.
     * @param array $data The data array to validate against.
     * @param bool $returnJsonResponse Whether to return JsonResponse in case of validation failure.
     * @throws JsonValidationException If the validation fails.
     */
    private function validateURI(string $paramName, array $data, bool $returnJsonResponse = true): void
    {
        if (isset($data[$paramName])) {
            $isValidURI = $this->URIValidator->isValidURI($data[$paramName], $returnJsonResponse);
            if ($isValidURI instanceof JsonResponse) {
                throw new JsonValidationException($isValidURI->getContent());
            }
        }
    }

    /**
     * Validation method for name data.
     * @param string $paramName The name of the name parameter.
     * @param array $data The data array to validate against.
     * @param bool $returnJsonResponse Whether to return JsonResponse in case of validation failure.
     * @throws JsonValidationException If the validation fails.
     */
    private function validateName(string $paramName, array $data, bool $returnJsonResponse = true): void
    {
        if (isset($data[$paramName])) {
            $isValidName = $this->nameValidator->isValidName($data[$paramName], $returnJsonResponse);
            if ($isValidName instanceof JsonResponse) {
                throw new JsonValidationException($isValidName->getContent());
            }
        }
    }
}