<?php namespace App\Http\Controllers\Api\V1;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Nodes\Node;

class NodeController extends Controller {

	public function index()
	{
        $nodes = Node::all(['id', 'name']);
        return $nodes;
	}

}
