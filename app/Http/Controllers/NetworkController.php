<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NetworkController extends Controller
{
    /**
     * Gets all the network connections of the logged in user
     * @param Request $request
     * @return 
     */
    public function getNetworkConnections(Request $request){
        $userEmail = $request->user()->email;

        
    }
}
