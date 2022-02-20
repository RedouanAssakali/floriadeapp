import { Injectable } from '@angular/core';
import mapboxgl from "mapbox-gl";
import {Poi} from "../models/poi";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  get lat(): number {
    return this._lat;
  }

  get long(): number {
    return this._long;
  }
  private _lat: number;
  private _long: number
  private map : mapboxgl.Map;
  constructor() { }


  buildMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicGlldGVybm9iZWwiLCJhIjoiY2t6bHBwbmJ5M3dnajMwbzE3dmpjeHo1aSJ9.l71vWXzIl7rnMXcB7IOvRQ';
    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [5.230754465629417, 52.35672913540671], // starting position [lng, lat]
      zoom: 18, // starting zoom
      bearing: 270

    });

    this.map.on('load', () => {
     this.map.addSource('radar', {
        'type': 'image',
        'url': 'https://res.cloudinary.com/gardenofpeace/image/upload/v1642949444/WhatsApp_Image_2022-01-23_at_15.31.41_hxqndo.jpg', //, https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif ,http://localhost:4200/radar.gif https://contactplatform.org/huisvanvrede/tuinvanvrede/images/tour.png, http://localhost:4200/tour.png, https://www.pcactive.nl/images/PCA/PCA_309/giphy.gif
        'coordinates': [

          [5.23040, 52.35650],
          [5.23106, 52.35650],
          [5.23106, 52.35701],
          [5.23040, 52.35701]

        ]
      });
      this.map.addLayer({
        id: 'radar-layer',
        'type': 'raster',
        'source': 'radar',
        'paint': {
          'raster-fade-duration': 0
        }
      });
    });


    // Get LNG & LAT
    this.map.on('click', (e) => {
      this._long= e.lngLat.lng;
      this._lat = e.lngLat.lat;
    });
  }

  mapclick(): void{
    let long;
    let lat;
    this.map.on('click', (e) => {
      long= e.lngLat.lng;
     lat = e.lngLat.lat;
    });
  }

}
