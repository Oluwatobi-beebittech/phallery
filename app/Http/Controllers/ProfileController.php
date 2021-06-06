<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    //
    public function getMyProfile(Request $request){
        return $request->user();
    }
}
