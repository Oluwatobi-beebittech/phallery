<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class SearchController extends Controller
{
    //
    public function search(Request $request,$text){
        $user_email = $request->user()->email;
        return User::find($user_email);
    }
}
