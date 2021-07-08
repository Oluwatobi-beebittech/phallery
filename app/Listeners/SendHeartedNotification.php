<?php

namespace App\Listeners;

use App\Events\HeartProcessed;
use App\Models\Notification;
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
        $heart = $event->heart;
        $hearter_first_name = $heart->user->first_name;
        $hearter_last_name = $heart->user->last_name;

        $post = $heart->post;
        $post_text = substr($post->post_text,0,10);
        $recipient = $post->user_email;

        $message = $hearter_first_name ." ". $hearter_last_name . " hearted your post about \"".$post_text."\"";
        
        Notification::create(['recipient'=>$recipient, 'message'=>$message]);
    }
}
