<?php

use App\Models\Nodes\Node;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $db = storage_path() . '/nodes' . '.sqlite';
        if (!file_exists($db)) {
            $f = fopen($db, 'w');
            Artisan::call('migrate', array(
                '--database' => 'nodes',
                '--path' => 'database/migrations/nodes'
            ));
        }
        $this->call('NodeTableSeeder');
        $nodes = Node::all();

        foreach ($nodes as $node) {
            $this->command->info('填充节点: ' . $node->name . '...');
            $db = storage_path() . '/' . $node->db_name . '.sqlite';
            config(['database.connections.node.database' => $db]);
            if (!file_exists($db)) {
                fclose(fopen($db, 'w'));
                DB::reconnect('node');
                Artisan::call('migrate', array(
                    '--database' => 'node',
                    '--path' => 'database/migrations/node'
                ));
            }
            $this->call('UserTableSeeder');
            $this->call('RoleTableSeeder');
        }
    }

}
