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
            'pois.*.id' => 'required|integer',
            'pois.*.seq' => 'required|integer'
        ]);
        // var_dump($request->pois); die;
        $tour = Tour::create($data);
        // $tour->name = $request->name;
        // $tour->description = $request->description;
        // var_dump($request->pois); die;
        // $tour->save();
        $arr = [];
        foreach ($request->pois as $val) {
            $poi = Poi::find($val['id']);
            $tour->pois()->attach($poi, [
                'seq' => $val['seq']
            ]);
        }

        // $tour->pois()->attach([$val['id']=>['seq' => $val['seq']]]);

        return 'OK';
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
        $ret = [];
        $tours = Tour::orderBy('name')->get();
        foreach ($tours as $tour) {
            $arr['tour'] = $tour;
            foreach ($tour->pois as $pois) {
                $arr[] = $pois;
            }
            $ret[] = $arr;
        }
        return $ret;
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

        return 'OK';
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
