import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-tour-page',
  templateUrl: './tour-page.component.html',
  styleUrls: ['./tour-page.component.css']
})
export class TourPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
this.map()
  }



  map(){
    mapboxgl.accessToken = 'pk.eyJ1IjoicGlldGVybm9iZWwiLCJhIjoiY2t6bHBwbmJ5M3dnajMwbzE3dmpjeHo1aSJ9.l71vWXzIl7rnMXcB7IOvRQ';
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [5.23073,52.356755], // starting position [lng, lat]
      zoom: 15 // starting zoom
    });

    map.on('load', () => {
      map.addSource('radar', {
        'type': 'image',
        'url': 'https://res.cloudinary.com/gardenofpeace/image/upload/v1642949444/WhatsApp_Image_2022-01-23_at_15.31.41_hxqndo.jpg', //, https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif ,http://localhost:4200/radar.gif https://contactplatform.org/huisvanvrede/tuinvanvrede/images/tour.png, http://localhost:4200/tour.png, https://www.pcactive.nl/images/PCA/PCA_309/giphy.gif
        'coordinates': [

          [5.23040, 52.35650],
          [5.23106, 52.35650],
          [5.23106, 52.35701],
          [5.23040, 52.35701]

        ]
      });
      map.addLayer({
        id: 'radar-layer',
        'type': 'raster',
        'source': 'radar',
        'paint': {
          'raster-fade-duration': 0
        }
      });
    });


  }


}
