<?php
namespace App\Http\Controllers;

use App\Models\PoiContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PoiContentController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return PoiContent::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'poi_id' => 'required',
            'language' => 'required',
            'title' => 'required',
            'body' => 'required',
            'audiopath' => 'file|mimes:mp3'
        ]);
        $audiopath = '';
        if ($request->file('audiopath')) {
            $audiopath = Storage::put('public/files', $request->file('audiopath'));
        }
        return PoiContent::create([
            'poi_id' => $request->poi_id,
            'language' => $request->language,
            'title' => $request->title,
            'body' => $request->body,
            'audiopath' => $audiopath
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $poi_id, string $lang)
    {
        return PoiContent::where('poi_id', '=', $poi_id)->where('language', '=', $lang)
            ->get()
            ->each(function ($content) {
            if (! empty($content->audiopath)) {
                $content->audiopath = Storage::url($content->audiopath);
            }
        });
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $poi_id, $lang)
    {
        $request->validate([
            'title' => 'required',
            'body' => 'required',
            'audiopath' => 'file|mimes:mp3'
        ]);
        $poiContent = PoiContent::where('poi_id', '=', $poi_id)->where('language', '=', $lang);
        $audiopath = '';
        if ($request->file('audiopath')) {
            $audiopath = Storage::put('public/files', $request->file('audiopath'));
        }
        $poiContent->update([
            'title' => $request->title,
            'body' => $request->body,
            'audiopath' => $audiopath
        ]);
        
        return $poiContent;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
