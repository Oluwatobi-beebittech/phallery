<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class SearchController extends Controller
{
    //
    /**
     * Get the users that match search text
     * @param   \Illuminate\Http\Request  $request
     *          String $text
     * @return App\Models\User
     */
    public function search(Request $request,$text){
        $signedInUserEmail = $request->user()->email;
        $user = User::select('first_name', 'last_name', 'email', 'profile_image')
                    ->where('email','<>',$signedInUserEmail)
                    ->where('first_name','like',"%$text%")
                    ->orWhere('last_name','Like',"%$text%")
                    ->where('email','<>',$signedInUserEmail)
                    ->get();
        
        return response()->json($user);
    }
}
