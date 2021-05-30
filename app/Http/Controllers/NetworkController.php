<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use APp\Models\Following;

class NetworkController extends Controller
{
    /**
     * Gets all the network connections of the logged in user
     * @param Request $request
     * @return 
     */
    public function getNetworkConnections(Request $request){
        $userEmail = $request->user()->email;

        $follows = Following::where('follower', $userEmail);
        $followingCount = $follows->count();

        $result = array('followingCount'=>$followsCount, 'connections'=>array());

        foreach($follower as $follows){

            $followed_email = $follower->follows;
            $followed_first_name = $follower->follows()->first_name;
            $followed_last_name = $follower->follows()->last_name;
            $followedCount = Following::where('follower', $followed_email)->count();

            $result['connections'].push(array('conn_first_name'=>$followed_first_name,
            'conn_last_name'=>$followed_last_name, 'conn_count'=>$followedCount));

        }

        return response()->json($result); 
    }
}
