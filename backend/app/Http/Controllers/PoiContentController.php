<?php
namespace App\Http\Controllers;

use App\Models\PoiContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PoiContentController extends Controller
{

    const TYPE_ENUM_PLANT = 'plant';

    const TYPE_ENUM_POI = 'poi';

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
            'filepath' => 'file|mimes:mp3'
        ]);
        $filepath = '';
        if ($request->file('filepath')) {
            $filepath = Storage::put('public/files', $request->file('filepath'));
        }
        return PoiContent::create([
            'poi_id' => $request->poi_id,
            'language' => $request->language,
            'title' => $request->title,
            'body' => $request->body,
            'filepath' => $filepath
        ]);
    }
    /**
     * storePlant a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function storePlant(Request $request)
    {
        $request->validate([
            'poi_id' => 'required',
            'language' => 'required',
            'type' => 'required|in:TYPE_ENUM_PLANT',
            'title' => 'required',
            'filepath' => 'file|mimes:jpeg,png'
        ]);
        $filepath = '';
        if ($request->file('filepath')) {
            $filepath = Storage::put('public/files', $request->file('filepath'));
        }
        return PoiContent::create([
            'poi_id' => $request->poi_id,
            'title' => $request->title,
            'body' => $request->body,
            'filepath' => $filepath
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
            ->where('type', '=', self::TYPE_ENUM_POI)
            ->get()
            ->each(function ($content) {
            if (! empty($content->filepath)) {
                $content->filepath = Storage::url($content->filepath);
            }
        });
    }

    public function showPlants(int $poi_id, string $lang)
    {
        return PoiContent::where('poi_id', '=', $poi_id)->where('language', '=', $lang)
            ->where('type', '=', self::TYPE_ENUM_PLANT)
            ->get()
            ->each(function ($content) {
            if (! empty($content->filepath)) {
                $content->filepath = Storage::url($content->filepath);
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
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'body' => 'required',
            'filepath' => 'file|mimes:mp3'
        ]);
        $poiContent = PoiContent::find($id);
        if (! empty($request->delete_file)) {
            if (! empty($poiContent->filepath)) {
                Storage::delete($poiContent->filepath);
            }
            $path = '';
        } else {
            $path = $poiContent->filepath;
            if ($request->file('filepath')) {
                $path = Storage::put('public/files', $request->file('filepath'));
                if (! empty($poiContent->filepath)) {
                    Storage::delete($poiContent->filepath);
                }
            }
        }
        $poiContent->update([
            'title' => $request->title,
            'body' => $request->body,
            'filepath' => $path
        ]);

        return $poiContent;
    }

    /**
     * updatePlant the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function updatePlant(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'filepath' => 'file|mimes:jpeg,png'
        ]);
        $poiContent = PoiContent::find($id);
        if (! empty($request->delete_file)) {
            if (! empty($poiContent->filepath)) {
                Storage::delete($poiContent->filepath);
            }
            $path = '';
        } else {
            $path = $poiContent->filepath;
            if ($request->file('filepath')) {
                $path = Storage::put('public/files', $request->file('filepath'));
                if (! empty($poiContent->filepath)) {
                    Storage::delete($poiContent->filepath);
                }
            }
        }
        $poiContent->update([
            'title' => $request->title,
            'filepath' => $path
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
