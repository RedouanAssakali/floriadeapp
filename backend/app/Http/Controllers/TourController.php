<?php
namespace App\Http\Controllers;

use App\Models\Poi;
use App\Models\Tour;
use Illuminate\Http\Request;

class TourController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Tour::find(1)->pois()
            ->orderBy('seq')
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);
        $tour = Tour::create($data);
        return $tour;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tour = Tour::find($id);
        $arr['tour'] = $tour;
        foreach ($tour->pois as $pois) {
            $arr[] = $pois;
        }
        return $arr;
    }

    public function showAll()
    {
        return Tour::orderBy('name')->get()->each(function($tour){
            $tour->pois;
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
        $data = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'pois.*.id' => 'required|integer',
            'pois.*.seq' => 'required|integer'
        ]);
        // var_dump($request->pois); die;
        $tour = Tour::find($id);
        $tour->update($data);
        $arr = [];
        foreach ($request->pois as $val) {
            $arr[$val['id']] = [
                'seq' => $val['seq']
            ];
        }
        $tour->pois()->sync($arr);

        return $tour;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Tour::destroy($id);
    }
}
