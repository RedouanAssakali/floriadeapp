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
        Schema::create('poi_tour', function (Blueprint $table) {
            $table->id();
            $table->foreignId('poi_id')->constrained('pois')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('tour_id')->constrained('tours')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->integer('seq');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('poi_tour');
    }
};
