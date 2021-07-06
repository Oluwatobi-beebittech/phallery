<?php

namespace App\Listeners;

use App\Events\ViewProfileProcessed;
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
        //
    }
}
