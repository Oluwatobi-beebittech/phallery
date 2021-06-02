<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Following;

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

        $result = array('followingCount'=>$followingCount, 'connections'=>array());

        foreach($follows as $follower){

            $followed_id = $follower->following_id;
            $followed_email = $follower->follows;

            $followedUser = $follower->follows();
            
            $followed_first_name = $followedUser->first_name;
            $followed_last_name = $followedUser->last_name;
            $followed_profile_image = $followedUser->profile_image;

            $followedCount = Following::where('follower', $followed_email)->count();

            $result['connections']
            .push(
                array(
                    'conn_follow_id'=>$followed_id,
                    'conn_first_name'=>$followed_first_name,
                    'conn_last_name'=>$followed_last_name,
                    'conn_count'=>$followedCount,
                    'conn_profile_image'=>$followed_image
                )
            );

        }

        return response()->json($result); 
    }

    public function isFollowing(Request $request, $email){
        $userEmail = $request->user()->email;
        $viewedEmail = $email;

        $isFollowing = Following::where('follower', $userEmail)->where('follows', $email)->exists();
        if($isFollowing){
            return response()->json(["isFollowing"=>true]);
        }
        return response()->json(["isFollowing"=>false]);
    }

    public function follow(Request $request, $email){
        $userEmail = $request->user()->email;
        $viewedEmail = $email;

        $isNotFollowing = Following::where('follower', $userEmail)->where('follows', $email)->doesntExist();
        if($isNotFollowing){

            $newFollowing = Following::create(['follower'=>$userEmail, 'follows'=>$viewedEmail]);
            return ($newFollowing 
                    ? response()->json(["isFollowing"=>true])
                    :response()->json(["isFollowing"=>false])
                    );
        }
        return response()->json(["isFollowing"=>false]);
    }

    public function unfollow(Request $request, $email){
        $userEmail = $request->user()->email;
        $viewedEmail = $email;

        $following = Following::where('follower', $userEmail)->where('follows', $email);
        if($following->exists()){

            $newUnFollowing = $following->delete();
            return ($newUnFollowing 
                    ? response()->json(["isFollowing"=>false])
                    :response()->json(["isFollowing"=>true])
                    );
        }
        return response()->json(["isFollowing"=>false]);
    }
}
