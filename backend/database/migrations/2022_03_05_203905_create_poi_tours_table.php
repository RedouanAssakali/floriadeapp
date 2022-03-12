<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pois_tours', function (Blueprint $table) {
            $table->id();
            $table->foreignId('poi_id')->constrained('pois')
                ->onUpdate('cascade')
                ->onDelete('cascade');            $table->timestamps();
            $table->foreignId('tour_id')->constrained('tours')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->integer('seq');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('poi_tours');
    }
};
