import { Component, OnInit } from '@angular/core';
import {PoiService} from "../../../services/poi.service";
import {ActivatedRoute} from "@angular/router";
import {Poi} from "../../../models/poi";
import {PoiContent} from "../../../models/poiContent";

@Component({
  selector: 'app-poi-content',
  templateUrl: './poi-content.component.html',
  styleUrls: ['./poi-content.component.css']
})
export class PoiContentComponent implements OnInit {

  constructor(private poiService: PoiService, private route: ActivatedRoute) { }
  private sub: any;
  poi: Poi = new Poi();
  poiContent: PoiContent;
  lang: string;



  ngOnInit(): void {

    this.lang = localStorage.getItem('lang');

    this.getId();
    this.poiContent = this.getContent(this.lang)
    console.log(this.poi.id)

  }




  getContent(lang: string):PoiContent{
    let content:PoiContent = new PoiContent();
    this.poiService.getPoiContent(7,lang).subscribe(data =>{
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
      this.poi.id  = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });
  }


}
