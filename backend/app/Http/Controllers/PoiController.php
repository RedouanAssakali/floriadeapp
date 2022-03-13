<?php
namespace App\Http\Controllers;

use App\Models\Poi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PoiController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Poi::all();
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
            'name' => 'required',
            'lat' => 'required',
            'long' => 'required',
            'imgpath' => 'file|mimes:jpeg,png'
        ]);

        $path = '';
        if ($request->file('imgpath')) {
            $path = Storage::put('public/files', $request->file('imgpath'));
        }
        return Poi::create([
            'name' => $request->name,
            'lat' => $request->lat,
            'long' => $request->long,
            'imgpath' => $path
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Poi::find($id);
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
            'name' => 'required',
            'lat' => 'required',
            'long' => 'required',
            'imgpath' => 'file|mimes:jpeg,png'
        ]);
        $poi = Poi::find($id);
        if (! empty($request->delete_file)) {
            if (! empty($poi->imgpath)) {
                Storage::delete($poi->imgpath);
            }
            $path = '';
        } else {
            $path = $poi->imgpath;
            if ($request->file('imgpath')) {
                $path = Storage::put('public/files', $request->file('imgpath'));
            }
        }
        $poi->update([
            'name' => $request->name,
            'lat' => $request->lat,
            'long' => $request->long,
            'imgpath' => $path
        ]);
        return $poi;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return int
     */
    public function destroy($id)
    {
        return Poi::destroy($id);
    }
}
