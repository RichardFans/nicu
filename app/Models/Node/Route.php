<?php namespace App\Models\Node;

class Route extends \Eloquent {

    protected $connection = 'node';

    protected $table = 'routes';

    protected $visible = array('state', 'url', 'templateUrl', 'controller');

    public function category()
    {
        return $this->belongsTo('App\Models\Node\Category');
    }
}
