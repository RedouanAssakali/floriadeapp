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

        Schema::create('poi_content', function (Blueprint $table) {
            $table->id();
            $table->foreignId('poi_id')->constrained('pois')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string('language');
            $table->string('title');
            $table->text('body');
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
        Schema::dropIfExists('poi_content');
    }
};
