<?php

namespace App\Service\Mailing;

use App\Entity\User;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;


/**
 * Service to send new password emails to users.
 * @package App\Service\Mailing
 */
class NewPasswordEmailService
{
    private $mailer;
    private $urlGenerator;

    /**
     * NewPasswordEmailService constructor.
     * @param MailerInterface $mailer The MailerInterface instance used for sending emails.
     * @param UrlGeneratorInterface $urlGenerator The UrlGeneratorInterface instance used for generating URLs.
     */
    public function __construct(MailerInterface $mailer, 
                                UrlGeneratorInterface $urlGenerator)
    {
        $this->mailer = $mailer;
        $this->urlGenerator = $urlGenerator;
    }

    /**
     * Send the new password email to the user.
     * @param User $user The User object representing the user to whom the email will be sent.
     * @param string $recipientEmail The recipient's email address.
     * @param string $newPassword The new password generated for the user's account. 
     * @return void
     */
    public function sendNewPasswordEmail(User $user, 
                                        string $recipientEmail,
                                        string $newPassword): void
    {
        // Declare and initialize the $firstName and $lastName variables
        $firstName = $user->getFirstName();
        $lastName = $user->getLastName();

        // Interpolate the first name and last name into the subject
        $subject = sprintf('Réinitialisation de votre mot de passe EasyGarden %s %s.', $firstName, $lastName);

        // Redirect link
        $redirectLink = 'http://localhost:4201/login';

        // Redirect button
        $redirectButton = sprintf(
            '<a href="%s" style="display: inline-block; 
                                background-color: #95cb11; 
                                color: #ffffff; 
                                border: 2px solid #C4F253; 
                                padding: 6px 10px; 
                                text-decoration: none; 
                                border-radius: 4px; 
                                transition: background-color 0.3s, color 0.3s;
                                height: 20px;
                                line-height: 20px;"
                                >Se connecter
            </a>',
            $redirectLink
        );

        // Generate email body as plain text
        $message = sprintf(
            "Bonjour %s %s, voici votre nouveau mot de passe pour vous connecter à EasyGarden :  %s\n\n",
            $firstName,
            $lastName,
            $newPassword,
            $redirectLink
        );
        $message .= "Ce lien restera valide pour une durée de 48H à compter de la réception de ce message, une fois ce délai expiré le nouveau mot de passe ne sera plus valide.";

        // Generate email body as HTML
        $htmlMessage = sprintf(
            'Bonjour %s %s, voici votre nouveau mot de passe pour vous connecter à <a href="https://easygarden.com" style="color: #95cb11; text-decoration: none;">EasyGarden</a> :  %s',
            $firstName,
            $lastName,
            $newPassword
        );
        $htmlMessage .= '<br><br>' . $redirectButton . '<br><br>';
        $htmlMessage .= 'Ce lien restera valide pour une durée de 48H à compter de la réception de ce message, une fois ce délai expiré le nouveau mot de passe ne sera plus valide.';

        // Generate email
        $email = (new Email())
            ->from('easygarden.noreply@gmail.com')
            ->to($recipientEmail)
            ->subject($subject)
            ->text($message)
            ->html($htmlMessage);

        $this->mailer->send($email);
    }
}