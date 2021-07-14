<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;
use Illuminate\Database\QueryException;
use App\Models\User;


class RegisterController extends Controller
{

        /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Store a newly created User in database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        try{
            $validatedData = $request->validate([
                'first_name' => 'required|alpha|max:255|min:2',
                'last_name' => 'required|alpha|max:255|min:2',
                'email' => 'required|email|max:255|min:2|unique:users',
                'phone_number' => 'nullable|digits:11|unique:users'
            ]);
            
            $user = User::create($request->all());
        }catch(QueryException $err)
        {
            return response()->json(["message"=>"Error connecting to database", "errors"=>"Database Unreachable"], 422);
        }
        return $user;
    }
}
