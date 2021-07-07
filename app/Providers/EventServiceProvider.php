<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

use App\Events\ProfileUpdateProcessed;
use App\Listeners\SendProfileUpdatedNotification;
use App\Events\LikeProcessed;
use App\Listeners\SendLikedNotification;
use App\Events\HeartProcessed;
use App\Listeners\SendHeartedNotification;
use App\Events\CommentProcessed;
use App\Listeners\SendCommentedNotification;
use App\Events\ViewProfileProcessed;
use App\Listeners\SendViewProfileNotification;
use App\Events\FollowProcessed;
use App\Listeners\SendFollowedNotification;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        ProfileUpdateProcessed::class => [
            SendProfileUpdatedNotification::class
        ],
        LikeProcessed::class => [
            SendLikedNotification::class
        ],
        HeartProcessed::class => [
            SendHeartedNotification::class
        ],
        CommentProcessed::class => [
            SendCommentedNotification::class
        ],
        ViewProfileProcessed::class => [
            SendViewProfileNotification::class
        ],
        FollowProcessed::class => [
            SendFollowedNotification::class
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
