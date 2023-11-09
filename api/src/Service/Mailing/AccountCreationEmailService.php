<?php

namespace App\Service\Mailing;

use App\Entity\User;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;


/**
 * Service to send activation emails to newly registered users.
 * @package App\Service\Mailing
 */
class AccountCreationEmailService
{
    private $mailer;
    private $urlGenerator;

    /**
     * AccountCreationEmailService constructor.
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
     * Send an activation email to the user.
     * @param User $user The User object representing the user to whom the email will be sent.
     * @param string $recipientEmail The recipient's email address.
     * @param string $activationToken The activation token generated for the user's account activation.
     * @return void
     */
    public function sendActivationEmail(User $user,
                                        string $recipientEmail,
                                        string $activationToken): void
    {
        // Declare and initialize the $firstName and $lastName variables
        $firstName = $user->getFirstName();
        $lastName = $user->getLastName();

        // Generate an activation token for the user
        $activationLink = $this->urlGenerator->generate(
            'account_activation',
            ['token' => $activationToken],
            UrlGeneratorInterface::ABSOLUTE_URL
        );

        // Interpolate the first name and last name into the subject
        $subject = sprintf('Veuillez activer votre compte %s %s.', $firstName, $lastName);

        // Activation button
        $activationButton = sprintf(
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
                                >Activer le compte
            </a>',
            $activationLink
        );

        // Generate email body as plain text
        $message = sprintf(
            "Bonjour %s %s, merci pour votre inscription à Easygarden !\n\nVeuillez cliquer sur le lien suivant pour activer votre compte svp => %s\n\n",
            $firstName,
            $lastName,
            $activationLink
        );
        $message .= "Ce lien restera valide pour une durée de 48H à compter de la réception de ce message, une fois ce délai expiré il vous sera nécessaire de vous inscrire à nouveau.";

        // Generate email body as HTML
        $htmlMessage = sprintf(
            'Bonjour %s %s, merci pour votre inscription à <a href="https://easygarden.com" style="color: #95cb11; text-decoration: none;">Easygarden</a> !<br><br>',
            $firstName,
            $lastName
        );
        $htmlMessage .= 'Veuillez cliquer sur le lien suivant pour activer votre compte svp => ' . '<br><br>' . $activationButton . '<br><br>';
        $htmlMessage .= 'Ce lien restera valide pour une durée de 48H à compter de la réception de ce message, une fois ce délai expiré il vous sera nécessaire de vous inscrire à nouveau.';

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