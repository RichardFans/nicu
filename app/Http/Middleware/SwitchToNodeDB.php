<?php namespace App\Http\Middleware;

use App\Models\Nodes\Node;
use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;

class SwitchToNodeDB
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $node_id = null;
        $node = $request->get('node');
        if (is_null($node)) {
            if (JWTAuth::getToken()) {
                $payload = JWTAuth::getPayload();
                $node_id = $payload->get('node_id');
                if (!$node_id) {
                    $node_id = null;
                }
            }
        } else {
            $node_id = $node['id'];
        }

        if (!is_null($node_id)) {
            $node = Node::findOrFail($node_id);
            $db = storage_path() . '/' . $node->db_name . '.sqlite';
            config(['database.connections.node.database' => $db]);
        }

        return $next($request);
    }

}
