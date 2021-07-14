<?php

namespace App\Http\Controllers;

use App\Models\Notification;
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
                                            $time_elapsed = $notify->created_at->diffForHumans();
                                            return [
                                                'notification_id'=>$notify->notification_id,
                                                'message'=>$notify->message,
                                                'timeElapsed'=>$time_elapsed,
                                                'wasRead'=>$notify->was_read
                                            ];
                                          }
                                        )
                                        ->all();
    
        return response()->json($notification);
    }

    public function markAsRead(Request $request, $notifyId){
        $signedInUserEmail = $request->user()->email;
        Notification::where('recipient',$signedInUserEmail)
                    ->where('notification_id',$notifyId)
                    ->update(['was_read'=>true]);

        return response()->json(["message"=>"Marked as read successfully", "status"=>"success"],200);
    }

    public function markAllAsRead(Request $request){
        $signedInUserEmail = $request->user()->email;
        Notification::where('recipient',$signedInUserEmail)
                    ->where('was_read',false)
                    ->update(['was_read'=>true]);

        return response()->json(["message"=>"All marked as read successfully", "status"=>"success"],200);
    }
}
