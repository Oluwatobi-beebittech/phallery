<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Post;

class PostController extends Controller
{
    public function getMyPosts(Request $request){

        $userEmail =  $request->user()->email;
        $posts = Post::where('user_email', $userEmail)->get();
        return $posts;
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
        $posts = Post::where('user_email', $email)->get();
        return $posts;
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
