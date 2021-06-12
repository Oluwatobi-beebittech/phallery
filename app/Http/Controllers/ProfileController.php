<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    //
    public function getMyProfile(Request $request){
        return $request->user();
    }

    public function update(Request $request){
        
        $user = $request->user();
        $isSamePhoneNumber = $user->phone_number == $request->phone_number;
        
        if($isSamePhoneNumber){
            $request->merge(['phone_number' => null]);
        }
        
        $validatedData = Validator::make($request->all(),[
            'first_name' => 'required|alpha|max:255|min:2',
            'last_name' => 'required|alpha|max:255|min:2',
            'phone_number' => 'nullable|digits:11|unique:users',
            'profile_image' =>'nullable|image'
        ]);
        
        if($validatedData->fails()){
            return response()->json(["message"=>"Failed to update profile", "errors"=>$validatedData->errors(), "status"=>"failed"], 422);
        }

        
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        if($request->hasFile('profile_image')){
            $user->profile_image = $request->file('profile_image')->store('profile');
        }
        if(!$isSamePhoneNumber){
            $user->phone_number = $request->phone_number;
        }

        $user->save();
        return response()->json(["message"=>"Profile updated successfully", "status"=> "success"]);
    }
}
