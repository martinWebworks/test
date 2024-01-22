<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LoginLinkEmail extends Mailable
{
    use Queueable, SerializesModels;

    public string $loginUrl;


    /**
     * Create a new message instance.
     */
    public function __construct($loginUrl)
    {
        $this->loginUrl = $loginUrl;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('webportal@backend.test', 'Support Team'),
            subject: 'Login Link Email',
        );
    }

    public function build()

    {
        return $this->markdown('mail.index', ['magicLink' => $this->loginUrl]);
    }


    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
