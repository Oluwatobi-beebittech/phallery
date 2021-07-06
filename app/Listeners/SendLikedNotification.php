<?php

namespace App\Listeners;

use App\Events\LikeProcessed;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendLikedNotification
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
     * @param  LikeProcessed  $event
     * @return void
     */
    public function handle(LikeProcessed $event)
    {
        //
    }
}
