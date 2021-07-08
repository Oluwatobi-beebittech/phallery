<?php

namespace App\Listeners;

use App\Events\ViewProfileProcessed;
use App\Models\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendViewProfileNotification
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
     * @param  ViewProfileProcessed  $event
     * @return void
     */
    public function handle(ViewProfileProcessed $event)
    {
        $user = $event->user;
        $first_name = $user->first_name;
        $last_name = $user->last_name;

        $recipient = $event->email;
        $message = $first_name." ".$last_name." viewed your profile";

        Notification::create(['recipient'=>$recipient, 'message'=>$message]);
    }
}
