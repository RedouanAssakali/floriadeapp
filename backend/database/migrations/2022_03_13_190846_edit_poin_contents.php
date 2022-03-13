<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('poi_contents', function (Blueprint $table) {
            $table->renameColumn('audiopath', 'filepath');
            $table->enum('type', [
                'poi',
                'plant'
            ])
                ->after('language')
                ->default('poi');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropColumns('poi_contents', 'type');
        Schema::dropColumns('poi_contents', 'filepath');
    }
};
