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
        $posts = Post::select('post_id', 'post_text', 'post_image', 'likes','hearts','comments')->where('user_email', $userEmail)->get();
        foreach($posts as $post){
            $post->self_like=true;
            
        }
        
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
        $posts = Post::select('post_id', 'post_text', 'post_image', 'likes','hearts','comments')->where('user_email', $email)->get();
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
        return Comment::where('post_id', $postId)->get();
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
