<?php namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Models\Node\Category;
use Tymon\JWTAuth\Facades\JWTAuth;

class PermissionController extends Controller
{

    public function show($id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $categories = Category::with(['permission'])->get();
        foreach ($categories as $i => $category) {
            if ($user->can($category->permission->name)) {
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
