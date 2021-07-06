<?php

namespace App\Listeners;

use App\Events\ProfileUpdateProcessed;
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
        //
    }
}
