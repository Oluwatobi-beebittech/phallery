<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Carbon\Carbon;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getNotificationCount(Request $request){

        $signedInUserEmail = $request->user()->email;

        $notificationCount = Notification::where('recipient', $signedInUserEmail)
                                          ->where('was_read',false)
                                          ->count();
        return response()->json(['notificationCount'=>$notificationCount, 'status'=>'success'], 200);
    }

    public function getNotifications(Request $request){
        $signedInUserEmail = $request->user()->email;

        $notification = Notification::where('recipient', $signedInUserEmail)
                                      ->where('was_read',false)
                                      ->get()
                                      ->map(
                                          function($notify){
                                            $time = Carbon::parse($notify->created_at);
                                            $time_elapsed = $time->diffForHumans();
                                            return [
                                                'notification_id'=>$notify->notification_id,
                                                'message'=>$notify->message,
                                                'time_elapsed'=>$time_elapsed
                                            ];
                                          }
                                        )
                                        ->all();
    
        return $notification;
    }
}
