<?php

namespace App\Listeners;

use App\Events\ProfileUpdateProcessed;
use App\Models\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendProfileUpdatedNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  ProfileUpdateProcessed  $event
     * @return void
     */
    public function handle(ProfileUpdateProcessed $event)
    {
        $user_email = $event->user->email;
        $message = "You have updated your profile successfully";
        Notification::create(['recipient'=>$user_email,'message'=>$message]);
    }
}
