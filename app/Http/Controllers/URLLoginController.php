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
                    'api.pass', now()->addMinutes(10), ['user' => $request->email,'token'=>$plainTextToken]
                );
                
                
                Mail::to($request->email)->send(new LoginURL($signedURL));
                
                
                return response()->json(["status"=>"Success", "togken"=>"old","message" => $user->tokens]);
            }
        }catch(\Illuminate\Database\QueryException $err){
            return response()->json(["status"=>"Failed", "message"=>"Error  connecting to database","error"=>$err]);
        }catch(\Swift_TransportException $e){
            return response()->json(["status"=>"Failed", "message"=>"Could not connect to mail server. Kindly try again."]);
        }
        return response()->json(["status"=>"Failed", "message"=>"Some errors were encountered. Ensure the email is
        registered."]);
    }


    public function signedLogin(Request $request, $user)
    {
        if($request->hasValidSignature()){
            $user_obj = User::where('email',$user)->first();
            if($user_obj->exists()){
                
                if(count($user_obj->tokens)>0){
                    return response()->view("dashboard.index");
                }
                
            }
            return response()->json(["message"=>"User object tokens is not >0"]);
            
        }
        return response()->json(["message"=>"Request has invalid signature"]);
    }
}
