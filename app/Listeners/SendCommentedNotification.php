<?php

namespace App\Listeners;

use App\Events\CommentProcessed;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendCommentedNotification
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
     * @param  CommentProcessed  $event
     * @return void
     */
    public function handle(CommentProcessed $event)
    {
        //
    }
}
