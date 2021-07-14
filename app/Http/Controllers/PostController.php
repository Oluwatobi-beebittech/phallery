<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Post;
use App\Models\Like;
use App\Models\Heart;
use App\Models\Comment;
use App\Events\CommentProcessed;
use App\Events\LikeProcessed;
use App\Events\HeartProcessed;

class PostController extends Controller
{
    /**
     * Gets all the post of the signed in user
     * @param \Illuminate\Http\Request $request
     * @return JSON
     */
    public function getMyPosts(Request $request){
        $signedInUserEmail =  $request->user()->email;
        $posts = Post::select('post_id', 'user_email','post_text', 'post_image', 'likes','hearts','comments','created_at')
                        ->where('user_email', $signedInUserEmail)
                        ->orderBy('created_at','desc')
                        ->get()
                        ->map(
                            function($post) use ($signedInUserEmail){ 
                                $self_comment = Comment::where('post_id',$post->post_id)->where('user_email',$signedInUserEmail)->exists();
                                $self_like = Like::where('post_id',$post->post_id)->where('user_email',$signedInUserEmail)->exists();
                                $self_heart = Heart::where('post_id',$post->post_id)->where('user_email',$signedInUserEmail)->exists();
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
        $signedInUserEmail = $request->user()->email;
        Post::where('post_id',$postId)->increment('likes');
        $like = Like::create(['post_id'=>$postId, 'user_email'=>$signedInUserEmail]);
        LikeProcessed::dispatch($like);
        return response()->json(["message"=>"Post liked"]);
    }

    /**
     * Handles the unliking of a post
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function unLikePost(Request $request, $postId){
        $signedInUserEmail = $request->user()->email;
        Post::where('post_id',$postId)->decrement('likes');
        $like = Like::where('post_id', $postId)->where('user_email',$signedInUserEmail);
        $like->delete();
        return response()->json(["message"=>"Post unliked"]);
    }

    /**
     * Handles the hearting of a post
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function heartPost(Request $request, $postId){
        $signedInUserEmail = $request->user()->email;
        Post::where('post_id',$postId)->increment('hearts');
        $heart = Heart::create(['post_id'=>$postId, 'user_email'=>$signedInUserEmail]);
        HeartProcessed::dispatch($heart);
        return response()->json(["message"=>"Post hearted"]);
    }

    /**
     * Handles the unhearting of a post
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function unHeartPost(Request $request, $postId){
        $signedInUserEmail = $request->user()->email;
        Post::where('post_id',$postId)->decrement('hearts');
        $heart = Heart::where('post_id', $postId)->where('user_email',$signedInUserEmail);
        $heart->delete();
        return response()->json(["message"=>"Post unhearted"]);
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
        $signedInUserEmail = $request->user()->email;
        $comment = Comment::create([
                                'user_email'=>$signedInUserEmail,
                                'post_id'=>$request->post_id,
                                'comment'=>$request->comment
                                ]);
        $comment->post()->increment('comments');
        CommentProcessed::dispatch($comment);
        return response()->json(["message"=>"Comment created","status"=>"success"], 201);

    }

    public function getCommentsOnPost(Request $request, $postId){
        $comments = Comment::where('post_id', $postId)->get();
        $signedInUserEmail = $request->user()->email;
        $result = array();
        foreach($comments as $comment){
            $commenter_first_name = $comment->user->first_name;
            $commenter_last_name = $comment->user->last_name;
            $commenter_profile_image = $comment->user->profile_image;
            $comment_time_elapsed = $comment->created_at->diffForHumans();
            $isOwnComment = $signedInUserEmail == $comment->user_email;
            
            array_push($result, array(
                "comment_id"=>$comment->comment_id,
                "post_id"=>$comment->post_id,
                "email"=>$comment->user_email,
                "comment"=>$comment->comment,
                "first_name"=>$commenter_first_name,
                "last_name"=>$commenter_last_name,
                "profile_image"=>$commenter_profile_image,
                "time_elapsed"=>$comment_time_elapsed,
                "isOwnComment"=>$isOwnComment
            ));
        }

        return $result;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {        
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
    public function show(Request $request, $email)
    {
        $signedInUserEmail =  $request->user()->email;
        $posts = Post::select('post_id', 'user_email','post_text', 'post_image', 'likes','hearts','comments','created_at')
                        ->where('user_email', $email)
                        ->orderBy('created_at','desc')
                        ->get()
                        ->map(
                            function($post) use ($signedInUserEmail){ 
                                $self_comment = Comment::where('post_id',$post->post_id)->where('user_email',$signedInUserEmail)->exists();
                                $self_like = Like::where('post_id',$post->post_id)->where('user_email',$signedInUserEmail)->exists();
                                $self_heart = Heart::where('post_id',$post->post_id)->where('user_email',$signedInUserEmail)->exists();
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


}
