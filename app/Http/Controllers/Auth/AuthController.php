<?php namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Node\User;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

//use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('switch_node_db');
    }

    public function postLogin(Request $request)
    {
        $credentials = Input::only('username', 'password');
        $node = Input::get('node');
        $customClaims = ['node_id' => $node['id']];

        if (!$token = JWTAuth::attempt($credentials, $customClaims)) {
            return Response::json(false, HttpResponse::HTTP_UNAUTHORIZED);
        }
        $user = JWTAuth::toUser($token);

        return Response::json(compact('token', 'user'));
    }

    public function postRegister(Request $request)
    {
        $credentials = Input::only('username', 'password');

        try {
            $user = User::create($credentials);
        } catch (Exception $e) {
            return Response::json(['error' => '用户已存在！'],
                HttpResponse::HTTP_CONFLICT);
        }

        $token = JWTAuth::fromUser($user);

        return Response::json(compact('token'));
    }

}
