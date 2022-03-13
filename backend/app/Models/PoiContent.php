<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PoiContent extends Model
{
    use HasFactory;
    protected $fillable = [
        'poi_id',
        'language',
        'type',
        'title',
        'body',
        'filepath'
    ];
}
