<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        return $request->user();
        $validatedData = $request->validate([
            'user_email'=>'required|email|max:255|min:2|unique:users',
            'post_text' => 'required|max:100|string',
            'post_image' => 'required|image'
        ]);
        
        $post = new Post;
        $post->user_email = $request->user_email;
        $post->post_text = $request->post_text;
        $post->post_image = $request->file('post_image')->store('posts');
        $post->user_email = $request->user_email;
        $post = Post::create($request->all());
        $post->save();
        return $post;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
