<?php

namespace App\Controller\Equipment;

use App\Service\Arduino\ArduinoConnectionService;
use App\Service\Header\XTypeValueService;
use App\Service\Json\JsonDataValidatorService;
use App\Service\Repository\UpdateStatusCorrectRepositoryService;
use App\Utility\Json\JsonValidationException;
use App\Validator\Entity\IdParameterValidator;
use App\Validator\Header\XTypeValueValidator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
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
    private $arduinoConnectionService;
    private $idParameterValidator;
    private $jsonDataValidator;
    private $repositoryService;
    private $xTypeValueService;
    private $xTypeValueValidator;

    /**
     * UpdateStatusController constructor.
     * @param ArduinoConnectionService $arduinoConnectionService The service responsible for open the bluetooth connection with Arduinos.
     * @param IdParameterValidator $idParameterValidator The service responsible for validating the id parameter.
     * @param JsonDataValidatorService $jsonDataValidator The service responsible for validating the json format of the request.
     * @param UpdateStatusCorrectRepositoryService $repositoryService The service responsible for interacting with the repository for updating status.
     * @param XTypeValueService $xTypeValueService The service responsible for extracting header values.
     * @param XTypeValueValidator $xTypeValueValidator The service responsible for validating the X-Type header.
     */
    public function __construct(ArduinoConnectionService $arduinoConnectionService,
                                IdParameterValidator $idParameterValidator,
                                JsonDataValidatorService $jsonDataValidator,
                                UpdateStatusCorrectRepositoryService $repositoryService,
                                XTypeValueService $xTypeValueService,
                                XTypeValueValidator $xTypeValueValidator)
    {
        $this->arduinoConnectionService = $arduinoConnectionService;
        $this->idParameterValidator = $idParameterValidator;
        $this->jsonDataValidator = $jsonDataValidator;
        $this->repositoryService = $repositoryService;
        $this->xTypeValueService = $xTypeValueService;
        $this->xTypeValueValidator = $xTypeValueValidator;
    }

    /**
     * Update the status of an equipment entity.
     * This method is accessible via a PUT request to "/api/update_status/{id}" where "{id}" is the equipment's ID.
     * @param Request $request The HTTP request object containing the equipment's ID and status data in JSON format.
     * @return JsonResponse A JSON response indicating the result of the status update.
     * @Route("/api/update_status/{id}", methods={"PUT"})
     */
    public function updateStatus(Request $request)
    {
        // Get JSON request data
        $data = json_decode($request->getContent(), true);

        // // Check the presence of required keys and if their fields are valid
        // try {
        //     // Validate json data using JsonDataValidatorService, including custom validators
        //     $data = $this->jsonDataValidator->validateJsonData($request, ['status']);
        // } 
        // catch (JsonValidationException  $e) {
        //     // Handle json validation exception by returning a json response with the error message
        //     return new JsonResponse(['message' => $e->getMessage()], $e->getStatusCode());
        // }

        // Extract the value of {id} from the route
        $idValue = $request->attributes->get('id');
        // Validate {id} parameter by passing $idValue as an argument
        $isValidIdParameter = $this->idParameterValidator->isValidIdParameter($idValue, true);
        if ($isValidIdParameter !== true) {
          // Return JSON error response if validation fails
            return $isValidIdParameter;
        }

        // Get HEADER type and validate it
        $xType = $this->xTypeValueService->getXTypeValue();

        // Validate X-Type header
        $xTypeValidationResult = $this->xTypeValueValidator->isValidXTypeValue($xType);
        if ($xTypeValidationResult instanceof JsonResponse) {
            // Return JSON error response if validation fails
            return $xTypeValidationResult;
        }
        
        // Use the service to get the correct repository
        $repository = $this->repositoryService->getCorrectRepositoryForUpdateStatus($xType);

         // Use the repository to retrieve the equipment by ID
        $equipment = $repository->findById($idValue);
        if (!$equipment) {
            // Handle the case where equipment with the given ID is not found
            return new JsonResponse(['message' => 'Equipment not found'], Response::HTTP_NOT_FOUND);
        }

        // Get the status from $data
        $status = $data['status'];
        // Call the correct repository based on $xType and persist the status
        $repository->updateStatus($equipment, $status);

        // Create an instance of ArduinoConnectionService and pass the values
        // $arduinoService = new ArduinoConnectionService($bluetoothDevice, $serialDevice);
        // Open bluetooth connection with Arduino
        // try {
        //     $arduinoService->openBluetoothConnection($status);
        // OR
            // $this->arduinoConnectionService->openBluetoothConnection($status);
        // } catch (\Exception $e) {
        //     // Manage Bluetooth connection errors
        //     return new JsonResponse(['message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        // }

        // // Open serial connection with Arduino
        // try {
        //     $arduinoService->openSerialConnection($status);
        // OR
            // $this->arduinoConnectionService->openSerialConnection($status);
        // } catch (\Exception $e) {
        //     // Manage serial connection errors
        //     return new JsonResponse(['message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        // }
        
        // Message based on the equipment status
        $message = ($status === true) ? 'L\'équipement a été allumé!' : 'L\'équipement a été éteint!';
        return new JsonResponse(['message' => $message], Response::HTTP_OK);
    }
}