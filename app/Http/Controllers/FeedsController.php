<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Heart;

class FeedsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //return response()->json(['status'=>'success', 'redirect'=>'/dashboard/feeds', 'user' => auth('sanctum')->user()->id]);
        return response()->json(['status'=>'success', 'redirect'=>'/dashboard/feeds']);
    }

    public function getFeeds(Request $request){
        $user = $request->user();

        $follows = $user->follows;
        $result = array();
        $userEmail = $user->email;

        foreach($follows as $follow){
            $followed_email = $follow->follows;
            $posts = Post::select('post_id', 'user_email', 'post_text', 'post_image', 'likes','hearts','comments','created_at')->where('user_email', $followed_email)->orderBy('created_at','desc');
            $doesPostExist = $posts->exists();
            
            if($doesPostExist){
                $posts = $posts->get()->map(
                    function($post) use ($userEmail){ 
                        $self_comment = Comment::where('post_id',$post->post_id)->where('user_email',$userEmail)->exists();
                        $self_like = Like::where('post_id',$post->post_id)->where('user_email',$userEmail)->exists();
                        $self_heart = Heart::where('post_id',$post->post_id)->where('user_email',$userEmail)->exists();
                        return [
                            'post_id'=>$post->post_id,
                            'post_image'=>$post->post_image,
                            'user_email'=>$post->user_email,
                            'poster_first_name'=>$post->poster_first_name,
                            'poster_last_name'=>$post->poster_last_name,
                            'poster_profile_image'=>$post->poster_profile_image,
                            'post_text'=>$post->post_text,
                            'comments'=>$post->comments,
                            'hearts'=>$post->hearts,
                            'likes'=>$post->likes,
                            'self_comment'=>$self_comment,
                            'self_heart'=>$self_heart,
                            'self_like'=>$self_like
                        ];
                    })
                ->all();;
                foreach($posts as $post){
                    array_push($result, $post);
                }
            }
        }

        return response()->json($result);
        

    }

}
