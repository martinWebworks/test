@component('mail::message')
    # Your Magic Link
    Click the button below to log in to your account:
    @component('mail::button', ['url' => $magicLink])
        Log In
    @endcomponent

    The Link expires in 5 minutes
    If you did not request this login link, please ignore this email.

    Thanks,<br>
    {{ config('app.name') }}
@endcomponent
