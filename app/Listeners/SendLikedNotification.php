<?php

namespace App\Listeners;

use App\Events\LikeProcessed;
use App\Models\Notification;
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
        $like = $event->like;
        $liker_first_name = $like->user->first_name;
        $liker_last_name = $like->user->last_name;

        $post = $like->post;
        $post_text = substr($post->post_text,0,10);
        $recipient = $post->user_email;

        $message = $liker_first_name ." ". $liker_last_name . " liked your post about \"".$post_text."\"";
        
        Notification::create(['recipient'=>$recipient, 'message'=>$message]);
    }
}
