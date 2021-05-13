<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use App\Models\User;
use App\Mail\LoginURL;

class URLLoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * Finds and sends a mail.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function findAndSend(Request $request)
    {
        //
        $validatedData = Validator::make($request->all(), ['email' => "required|email|max:255|min:2"]);

        if($validatedData->fails()){
            return response()->json(["status"=>"Failed", "errors"=>$validatedData->errors()]);
        }

        try{
            $user = User::find($request->email);
            if($user){
                $plainTextToken = $user->createToken($request->email)->plainTextToken;
                $signedURL = URL::temporarySignedRoute(
                    'api.pass', now()->addMinutes(60), ['user' => $request->email, 'token' => $plainTextToken]
                );
                
                
                Mail::to($request->email)->send(new LoginURL($signedURL));
                
                
                return response()->json(["status"=>"Success", "togken"=>"old","message" => $user->tokens]);
            }
        }catch(\Illuminate\Database\QueryException $err){
            return response()->json(["status"=>"Failed", "message"=>"Error  connecting to database"]);
        }catch(\Swift_TransportException $e){
            return response()->json(["status"=>"Failed", "message"=>"Could not conect to mail server. Kindly try again."]);
        }
        return response()->json(["status"=>"Failed", "message"=>"Some errors were encountered. Ensure the email is
        registered."]);
    }


    public function signedLogin(Request $request, $user)
    {
        if($request->hasValidSignature()){
            if(Auth::loginUsingId($user)){
                $token = $request->token;
                return response()->view("dashboard.index");
            }
            return response()->json(['status'=>'invalid', 'message' => 'User not found']);
            
        }
        return response()->json(['status'=>'invalid', "message" => "Invalid signature"]);
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
