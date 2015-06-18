<?php namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Models\Node\Category;
use App\Models\Node\Role;
use Tymon\JWTAuth\Facades\JWTAuth;

class PermissionController extends Controller
{

    public function show($id)
    {
        $role = Role::findOrFail($id);
        $categories = Category::with(['permission'])->get();
        foreach ($categories as $i => $category) {
            if ($role->can($category->permission->name)) {
                $categories[$i]->setAttribute('is_checked', true);
            } else {
                $categories[$i]->setAttribute('is_checked', false);
            }
            $categories[$i]->setVisible(['permission', 'is_checked', 'children']);
        }
        $category = $categories->toHierarchy();
        return $category;
    }

}
