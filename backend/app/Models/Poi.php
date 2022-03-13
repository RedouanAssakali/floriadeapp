<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Poi extends Model
{
    public function tour(){
        return $this->belongsToMany(Tour::class,'poi_tour')
            ->withTimestamps()
            ->withPivot(['seq']);
    }
    use HasFactory;
    protected $fillable = [
        'name',
        'lat',
        'long',
        'hasContent',
        'imgpath'
    ];
}
