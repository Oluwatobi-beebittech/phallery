<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;

class FeedsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //

        return response()->json(['status'=>'success', 'redirect'=>'/dashboard/feeds', 'user' => auth('sanctum')->user()->id]);
    }

    public function getFeeds(Request $request){
        $user = $request->user();

        $follows = $user->follows;
        $result = array();

        foreach($follows as $follow){
            $followed_email = $follow->follows;
            $posts = Post::select('post_id', 'post_text', 'post_image', 'likes','hearts','comments')->where('user_email', $followed_email);
            $doesPostExist = $posts->exists();
            
            if($doesPostExist){
                $posts = $posts->get();
                foreach($posts as $post){
                    array_push($result, $post);
                }
            }
        }

        return response()->json($result);
        

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
