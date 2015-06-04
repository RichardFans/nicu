<?php namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Models\Node\Category;
use Tymon\JWTAuth\Facades\JWTAuth;

class CategoryController extends Controller
{

    public function show($id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $categories = Category::with('route', 'permission')->get()->filter(function ($category) use ($user) {
            return $user->can($category->permission->name);
        });
        $category = $categories->toHierarchy();
        return $category;
    }

}
