<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Post;
use App\Models\Like;
use App\Models\Heart;
use App\Models\Comment;

class PostController extends Controller
{
    /**
     * Gets all the post of the signed in user
     * @param \Illuminate\Http\Request $request
     * @return JSON
     */
    public function getMyPosts(Request $request){

        $userEmail =  $request->user()->email;
        $posts = Post::select('post_id', 'user_email','post_text', 'post_image', 'likes','hearts','comments','created_at')
                        ->where('user_email', $userEmail)
                        ->orderBy('created_at','desc')
                        ->get()
                        ->map(
                            function($post,$key) use ($userEmail){ 
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
                        ->all();
        
        
        return $posts;
    }

    /**
     * Handles the liking of a post 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function likePost(Request $request, $postId){
        $userEmail = $request->user()->email;
        $post = Post::where('post_id',$postId)->first();
        $postLike = $post->likes;
        $post->likes = $postLike+1;

        Like::create(['post_id'=>$post->post_id, 'user_email'=>$userEmail]);
        
        $post->save();

        return response()->json(["message"=>"Post liked"]);
    }

    /**
     * Handles the unliking of a post
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function unLikePost(Request $request, $postId){
        $userEmail = $request->user()->email;
        $post = Post::where('post_id',$postId)->first();
        $postLike = $post->likes;
        $post->likes = $postLike-1;

        $like = Like::where('post_id', $post->post_id)->where('user_email',$userEmail);
        
        $like->delete();
        $post->save();
        return response()->json(["message"=>"Post unliked"]);
    }

    /**
     * Handles the hearting of a post
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function heartPost(Request $request, $postId){
        $userEmail = $request->user()->email;
        $post = Post::where('post_id',$postId)->first();
        $postHeart = $post->hearts;
        $post->hearts = $postHeart+1;

        Heart::create(['post_id'=>$post->post_id, 'user_email'=>$userEmail]);
        $post->save();

        return response()->json(["message"=>"Post hearted"]);
    }

    /**
     * Handles the unhearting of a post
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function unHeartPost(Request $request, $postId){
        $userEmail = $request->user()->email;
        $post = Post::where('post_id',$postId)->first();
        $postHeart = $post->hearts;
        $post->hearts = $postHeart-1;

        $heart = Heart::where('post_id', $post->post_id)->where('user_email',$userEmail);
        
        $heart->delete();
        $post->save();
        return response()->json(["message"=>"Post unhearted"]);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        
        $validatedData = Validator::make($request->all(),[
            'post_text' => 'required|max:100|string',
            'post_image' => 'required|image'
        ]);

        if($validatedData->fails()){
            return response()->json(["message"=>"Failed to create post", "errors"=>$validatedData->errors(), "status"=>"failed"]);
        }
        
        $post = new Post;
        
        $post->user_email = $request->user()->email;
        $post->post_text = $request->post_text;
        $post->post_image = $request->file('post_image')->store('posts');

        $post->save();

        return response()->json(["message"=>"Post created successfully", "status"=> "success"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $email
     * @return \Illuminate\Http\Response
     */
    public function show($email)
    {
        $posts = Post::select('post_id', 'user_email','post_text', 'post_image', 'likes','hearts','comments')->where('user_email', $email)->get();
        return $posts;
    }

    public function commentOnPost(Request $request){

        $validatedData = Validator::make($request->all(),
                                        [
                                            'post_id'=>'required|uuid|exists:posts',
                                            'comment'=>'required|string'
                                        ]);
        if($validatedData->fails()){
            return response()->json(["message"=>"Comment creation failed", "errors"=>$validatedData->errors(),"status"=>"failed"], 422);
        }

        $userEmail = $request->user()->email;
        $comment = Comment::create([
                                'user_email'=>$userEmail,
                                'post_id'=>$request->post_id,
                                'comment'=>$request->comment
                                ]);
        $post = $comment->post;
        $post_comment_count = $post->comments;
        $post->comments = $post_comment_count + 1;
        $post->save();

        return response()->json(["message"=>"Comment created","status"=>"success"], 201);

    }

    public function getCommentsOnPost(Request $request, $postId){
        $comments = Comment::where('post_id', $postId)->get();
        $currentUserEmail = $request->user()->email;
        $result = array();
        foreach($comments as $comment){
            $commenter_first_name = $comment->user->first_name;
            $commenter_last_name = $comment->user->last_name;
            $commenter_profile_image = $comment->user->profile_image;

            $comment_timestamp = strtotime($comment->created_at);
            $comment_date = date("d M y",$comment_timestamp);
            $comment_time = date("h:ia", $comment_timestamp);
            $isOwnComment = $currentUserEmail == $comment->user_email 
                            ? true 
                            : false;
            
            array_push($result, array(
                "comment_id"=>$comment->comment_id,
                "post_id"=>$comment->post_id,
                "email"=>$comment->user_email,
                "comment"=>$comment->comment,
                "first_name"=>$commenter_first_name,
                "last_name"=>$commenter_last_name,
                "profile_image"=>$commenter_profile_image,
                "date"=>$comment_date,
                "time"=>$comment_time,
                "isOwnComment"=>$isOwnComment
            ));
        }

        return $result;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }


}
