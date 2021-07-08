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
}
