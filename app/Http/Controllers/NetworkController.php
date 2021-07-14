<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\FollowProcessed;
use App\Events\ViewProfileProcessed;
use App\Models\Following;

class NetworkController extends Controller
{
    /**
     * Gets all the followings of the logged in user
     * @param Request $request
     * @return 
     */
    public function getFollowings(Request $request, $email = null){
        $userEmail = $email == null 
                     ? $request->user()->email 
                     : $email;

        $follows = Following::where('follower', $userEmail)->get();
        $follows = $follows->map(
            function ($follower){
                $followed_id = $follower->following_id;
                $followed_email = $follower->follows;
                $followedUser = $follower->userFollows;
                $followed_first_name = $followedUser->first_name;
                $followed_last_name = $followedUser->last_name;
                $followed_profile_image = $followedUser->profile_image;

                $followingCount = Following::where('follower', $followed_email)->count();
                $followerCount = Following::where('follows', $followed_email)->count();
                
                return [
                    'conn_follow_id'=>$followed_id,
                    'conn_email'=>$followed_email,
                    'conn_first_name'=>$followed_first_name,
                    'conn_last_name'=>$followed_last_name,
                    'conn_following_count'=>$followingCount,
                    'conn_follower_count'=>$followerCount,
                    'conn_profile_image'=>$followed_profile_image
                ];
            }
        )
        ->all();

        return response()->json($follows); 
    }

    /**
     * Gets all the followers of the logged in user
     * @param Request $request
     * @return 
     */
    public function getFollowers(Request $request, $email = null){
        $userEmail = $email == null 
                    ? $request->user()->email 
                    : $email;

        $followers = Following::where('follows', $userEmail)->get();
        $followers = $followers->map(
                        function ($follower){
                            $following_id = $follower->following_id;
                            $following_email = $follower->follower;
                            $followingUser = $follower->userFollowers;
                            $following_first_name = $followingUser->first_name;
                            $following_last_name = $followingUser->last_name;
                            $following_profile_image = $followingUser->profile_image;

                            $followingCount = Following::where('follower', $following_email)->count();
                            $followerCount = Following::where('follows', $following_email)->count();
                        
                            return [
                                'conn_follow_id'=>$following_id,
                                'conn_email'=>$following_email,
                                'conn_first_name'=>$following_first_name,
                                'conn_last_name'=>$following_last_name,
                                'conn_following_count'=>$followingCount,
                                'conn_follower_count'=>$followerCount,
                                'conn_profile_image'=>$following_profile_image
                            ];
                        }
                    )
                    ->all();

        return response()->json($followers); 
    }

    public function isFollowing(Request $request, $email){
        $user = $request->user();
        $signedInUserEmail = $user->email;
        $isFollowing = Following::where('follower', $signedInUserEmail)->where('follows', $email)->exists();
        ViewProfileProcessed::dispatch($user, $email);
        if($isFollowing){
            return response()->json(["isFollowing"=>true]);
        }
        return response()->json(["isFollowing"=>false]);
    }

    public function follow(Request $request, $email){
        $signedInUserEmail = $request->user()->email;

        $isNotFollowing = Following::where('follower', $signedInUserEmail)->where('follows', $email)->doesntExist();
        if($isNotFollowing){
            $following = Following::create(['follower'=>$signedInUserEmail, 'follows'=>$email]); 
            FollowProcessed::dispatch($following);
            return ($following 
                    ? response()->json(["isFollowing"=>true])
                    :response()->json(["isFollowing"=>false])
                    );
        }
        return response()->json(["isFollowing"=>false]);
    }

    public function unfollow(Request $request, $email){
        $signedInUserEmail = $request->user()->email;

        $following = Following::where('follower', $signedInUserEmail)->where('follows', $email);
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
