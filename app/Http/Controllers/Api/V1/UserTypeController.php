<?php namespace App\Http\Controllers\Api\V1;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Node\UserType;

use Illuminate\Http\Request;

class UserTypeController extends Controller {

	public function index()
	{
		$types = UserType::all();
        return $types;
	}

	public function store(Request $request)
	{
		UserType::create($request->all());
	}

	public function update($id, Request $request)
	{
        $type = UserType::findOrFail($id);
        $type->update($request->all());
	}

	public function destroy($id)
	{
        $type = UserType::findOrFail($id);
		$type->delete();
	}

}
