import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PoiService} from "../../../services/poi.service";
import {Poi} from "../../../models/poi";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {FormControl, FormGroup} from "@angular/forms";
import {EditorService} from "../../../services/editor.service";
import mapboxgl from "mapbox-gl";
import {PoiContent} from "../../../models/poiContent";

@Component({
  selector: 'app-edit-poi',
  templateUrl: './edit-poi.component.html',
  styleUrls: ['./edit-poi.component.css']
})
export class EditPoiComponent implements OnInit {


  id: number;
  private sub: any;
  active = 1;
  poi: Poi = new Poi();
  pois: Poi[];
  nlPoiContent: PoiContent;
  enPoiContent: PoiContent;
  frPoiContent: PoiContent;
  dePoiContent: PoiContent;


  constructor(private route: ActivatedRoute, private poiService: PoiService, public editorService: EditorService) {

  }


  ngOnInit(): void {
    this.getId();
    this.getPoi();
    this.map();

    this.nlPoiContent = this.getContentByLang("nl");
    this.enPoiContent = this.getContentByLang("en");
    this.dePoiContent = this.getContentByLang("de");
    this.frPoiContent = this.getContentByLang("fr");

    console.log(this.nlPoiContent);
  }

  htmlContent: any;
  form: any = new FormGroup({
    htmlContent1: new FormControl()
  });


  getContentByLang(lang: string):PoiContent{
    let content:PoiContent = new PoiContent();
    this.poiService.getPoiContent(this.poi.id,lang).subscribe(data =>{
      console.log(data[0])
      content.id = data[0].id;
      content.poiId = data[0].poi_id;
      content.lang = data[0].language;
      content.tile = data[0].title;
      content.body = data[0].body;
    })

    return content;
  }


  getId() {
    this.sub = this.route.params.subscribe(params => {
      this.poi.id  = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });
  }


  getPoi() {

    this.poiService.getPoiById( this.poi.id).subscribe(data => {

      this.poi.id = data.id
      this.poi.name = data.name
      this.poi.lat = data.lat
      this.poi.long = data.long

    });

  }

  onUpdate(){
    this.poiService.updatePoi(this.poi);
  }



  map() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicGlldGVybm9iZWwiLCJhIjoiY2t6bHBwbmJ5M3dnajMwbzE3dmpjeHo1aSJ9.l71vWXzIl7rnMXcB7IOvRQ';
    const map = new mapboxgl.Map({
      container: 'map',// container ID
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
      this.poi.long= e.lngLat.lng;
      this.poi.lat = e.lngLat.lat;
    });

  }





}
