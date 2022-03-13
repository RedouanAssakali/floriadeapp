import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PoiService} from "../../../services/poi.service";
import {Poi} from "../../../models/poi";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {FormControl, FormGroup} from "@angular/forms";
import {EditorService} from "../../../services/editor.service";
import mapboxgl from "mapbox-gl";
import {PoiContent} from "../../../models/poiContent";
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "@techiediaries/ngx-qrcode";

@Component({
  selector: 'app-edit-poi',
  templateUrl: './edit-poi.component.html',
  styleUrls: ['./edit-poi.component.css']
})
export class EditPoiComponent implements OnInit {


  id: number;
  private sub: any;
  audioSrc: string | ArrayBuffer ;
  active = 1;
  poi: Poi = new Poi();
  pois: Poi[];
  poiContents: PoiContent[];
  nlPoiContent: PoiContent;
  enPoiContent: PoiContent;
  frPoiContent: PoiContent;
  dePoiContent: PoiContent;
  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  public value: string;
  href: any;
  filedata:any
  constructor(private route: ActivatedRoute, private poiService: PoiService, public editorService: EditorService) {

  }


  ngOnInit(): void {
    this.getId();
    this.getPoi();


    this.nlPoiContent = this.getContentByLang("nl");
    this.enPoiContent = this.getContentByLang("en");
    this.dePoiContent = this.getContentByLang("de");
    this.frPoiContent = this.getContentByLang("fr");

    this.poiContents = [this.nlPoiContent, this.enPoiContent, this.dePoiContent, this.frPoiContent];

    this.map();

    this.value = 'http://localhost:4200/poi/' + this.poi.id;

  }

  htmlContent: any;
  form: any = new FormGroup({
    htmlContent1: new FormControl()
  });



  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.audioSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }
  getContentByLang(lang: string): PoiContent {
    let content: PoiContent = new PoiContent();
    this.poiService.getPoiContent(this.poi.id, lang).subscribe(data => {
      console.log(data[0])
      content.id = data[0].id;
      content.poiId = data[0].poi_id;
      content.lang = data[0].language;
      content.title = data[0].title;
      content.body = data[0].body;
    })

    return content;
  }


  getId() {
    this.sub = this.route.params.subscribe(params => {
      this.poi.id = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });
  }


  getPoi() {

    this.poiService.getPoiById(this.poi.id).subscribe(data => {

      this.poi.id = data.id
      this.poi.name = data.name
      this.poi.lat = data.lat
      this.poi.long = data.long
      this.poi.hasContent = data.hasContent
    });

  }

  onUpdate() {

    // @ts-ignore
    const fileNl =document.querySelector("[name=audioFiles]").files;
    // const fileNl = document.getElementById("audioFiles"+this.nlPoiContent.lang).file;
    // @ts-ignore
    // const fileEn = document.getElementById("audioFiles"+this.enPoiContent.lang).file;
    // // @ts-ignore
    // const fileFr = document.getElementById("audioFiles"+this.frPoiContent.lang).file;
    // // @ts-ignore
    // const fileDe = document.getElementById("audioFiles"+this.dePoiContent.lang).file;
    const formDataNl = new FormData();
    // const formDataEn = new FormData();
    // const formDataFr = new FormData();
    // const formDataDe = new FormData();

      formDataNl.append("audiopath", fileNl);
    // formDataEn.append("file", fileEn);
    // formDataFr.append("file", fileFr);
    // formDataDe.append("file", fileDe);
console.log(fileNl)

    this.poiService.updatePoi(this.poi);
    this.poiService.updatePoiContent(this.nlPoiContent,formDataNl);
    // this.poiService.updatePoiContent(this.enPoiContent,formDataEn);
    // this.poiService.updatePoiContent(this.dePoiContent,formDataDe);
    // this.poiService.updatePoiContent(this.frPoiContent,formDataFr);
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
      this.poi.long = e.lngLat.lng;
      this.poi.lat = e.lngLat.lat;
    });

  }

}
