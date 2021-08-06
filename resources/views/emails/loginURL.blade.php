@component('mail::message')
# Login Link

Here is the login link to your account. It expires in 10 minutes. Kindly
ignore this email if the action was not performed by you.

@component('mail::button', ['url' => 'https://'.$signedURL])
Click here to login
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
