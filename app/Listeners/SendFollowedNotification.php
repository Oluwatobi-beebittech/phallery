<?php

namespace App\Listeners;

use App\Events\FollowProcessed;
use App\Models\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendFollowedNotification
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
     * @param  FollowProcessed  $event
     * @return void
     */
    public function handle(FollowProcessed $event)
    {
        $following = $event->following;

        $recipient = $following->follows;
        $follower_first_name = $following->userFollowers->first_name;
        $follower_last_name = $following->userFollowers->last_name;

        $message = $follower_first_name." ".$follower_last_name." started following you";
        Notification::create(['recipient'=>$recipient, 'message'=>$message]);
    }
}
