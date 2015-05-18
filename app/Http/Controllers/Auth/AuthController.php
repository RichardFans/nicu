<?php namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Node\User;
use HttpResponse;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

//	use AuthenticatesAndRegistersUsers;
//
//	public function __construct(Guard $auth, Registrar $registrar)
//	{
//		$this->auth = $auth;
//		$this->registrar = $registrar;
//
//		$this->middleware('guest', ['except' => 'getLogout']);
//	}

    public function postLogin()
    {
        $credentials = Input::only('username', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return Response::json(false, HttpResponse::HTTP_UNAUTHORIZED);
        }

        return Response::json(compact('token'));
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
