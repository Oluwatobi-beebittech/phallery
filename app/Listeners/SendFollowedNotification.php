<?php

namespace App\Listeners;

use App\Events\FollowProcessed;
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
        //
    }
}
