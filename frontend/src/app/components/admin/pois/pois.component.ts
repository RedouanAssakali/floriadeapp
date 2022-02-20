import {Component, OnInit} from '@angular/core';
import {Poi} from "../../../models/poi";
import {combineLatest, Observable, of, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {PoiService} from "../../../services/poi.service";
import {NgbActiveModal, NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import mapboxgl from "mapbox-gl";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-pois',
  templateUrl: './pois.component.html',
  styleUrls: ['./pois.component.css']
})
export class PoisComponent implements OnInit {
  pois: Poi[];
  newPoi: Poi = new Poi();
  longitude: number;
  latitude: number;
  name: string;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private poiService: PoiService,
              private router: Router, private activated : ActivatedRoute) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;

    this.getAllPois();


  }

  ngOnInit(): void {


  }

  async getAllPois() {
    await this.poiService.getPois().subscribe(
      (data) => {
        // @ts-ignore
        this.pois = data;
        console.log(data);
      },
      (error) => console.log("Error: " + error.status + " - " + error.error)
    );

  }

  onEdit(poi: Poi) {
    this.router.navigate(['admin/poi/edit/',poi.id]);

  }


  onDelete(poi: Poi) {
  this.poiService.deletePoi(poi.id);
  this.getAllPois();

  }
  addPoi() {
    this.poiService.createPoi(this.newPoi);
    this.modalService.dismissAll()
    this.getAllPois();
  }

  open(content: any) {
    this.modalService.open(content);
    this.map()

  }


  map() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicGlldGVybm9iZWwiLCJhIjoiY2t6bHBwbmJ5M3dnajMwbzE3dmpjeHo1aSJ9.l71vWXzIl7rnMXcB7IOvRQ';
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [5.230754465629417, 52.35672913540671], // starting position [lng, lat]
      zoom: 18, // starting zoom
      bearing: 270

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


    // Get LNG & LAT
    map.on('click', (e) => {
      this.newPoi.long= e.lngLat.lng;
      this.newPoi.lat = e.lngLat.lat;
    });

  }


}
