<?php

namespace App\Listeners;

use App\Events\HeartProcessed;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendHeartedNotification
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
     * @param  HeartProcessed  $event
     * @return void
     */
    public function handle(HeartProcessed $event)
    {
        //
    }
}
