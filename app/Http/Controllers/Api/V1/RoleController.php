<?php namespace App\Http\Controllers\Api\V1;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Node\Role;

use Illuminate\Http\Request;

class RoleController extends Controller {

	public function index()
	{
		$roles = Role::all();
        return $roles;
	}

	public function store(Request $request)
	{
        Role::create($request->all());
	}

	public function update($id, Request $request)
	{
        $roles = Role::findOrFail($id);
        $roles->update($request->all());
	}

	public function destroy($id)
	{
        $roles = Role::findOrFail($id);
        $roles->delete();
	}

}
