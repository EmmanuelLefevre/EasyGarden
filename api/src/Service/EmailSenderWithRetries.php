<?php

namespace App\Service;

use App\Entity\User;
use App\Service\AccountCreationEmailService;

class EmailSenderWithRetries
{
    private $emailService;

    public function __construct(AccountCreationEmailService $emailService)
    {
        $this->emailService = $emailService;
    }

    public function sendActivationEmailWithRetries(User $user, string $activationToken): bool
    {
        // Function to send the email with retries
        $sendEmailWithRetries = function (User $user, string $activationToken) {
            // Send the account creation confirmation email with token activation link
            try {
                $this->emailService->sendActivationEmail($user, $user->getEmail(), $activationToken);
                // Return true if email is sent successfully
                return true;
            } catch (\Exception $e) {
                // Return false if email sending failed
                error_log('Email sending failed: ' . $e->getMessage());
                return false;
            }
        };

        // Attempt to send the email with retries
        $emailSent = $sendEmailWithRetries($user, $activationToken);

        if (!$emailSent) {
            // If the first attempt fails, wait for 5 minutes and try again
            sleep(300); // 5 minutes in seconds
            $emailSent = $sendEmailWithRetries($user, $activationToken);

            if (!$emailSent) {
                // If the second attempt fails, wait for 3 hours and try again
                sleep(3600); // 1 hour in seconds
                $emailSent = $sendEmailWithRetries($user, $activationToken);
            }
        }

        return $emailSent;
    }

}