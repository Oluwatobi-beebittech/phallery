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
        $user_email = $request->user()->email;
        return User::where('email','<>',$user_email)
                    ->where('first_name','like',"%$text%")
                    ->orWhere('last_name','Like',"%$text%")
                    ->where('email','<>',$user_email)
                    ->get();
    }
}
