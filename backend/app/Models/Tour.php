<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{

    public function pois(){
        return $this->belongsToMany(Poi::class,'poi_tour' )
            ->withPivot('seq')
            ->withTimestamps();
        }
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
    ];
}
