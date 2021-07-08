<?php

namespace App\Listeners;

use App\Models\Notification;
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
        $comment = $event->comment;
        $commenter_first_name = $comment->user->first_name;
        $commenter_last_name = $comment->user->last_name;

        $post = $comment->post;
        $post_text = substr($post->post_text,0,10);
        $recipient = $post->user_email;

        $message = $commenter_first_name ." ". $commenter_last_name . " commented on your post about \"".$post_text."\"";

        Notification::create(['recipient'=>$recipient, 'message'=>$message]);

    }
}
