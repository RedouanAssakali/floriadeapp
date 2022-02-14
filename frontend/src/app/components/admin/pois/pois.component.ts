import {Component, OnInit} from '@angular/core';
import {Poi} from "../../../models/poi";
import {combineLatest, Observable, of, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {PoiService} from "../../../services/poi.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-pois',
  templateUrl: './pois.component.html',
  styleUrls: ['./pois.component.css']
})
export class PoisComponent implements OnInit {
  pois: Poi[];

  constructor(private poiService: PoiService ) {
  this.getAllPois();





  }

  ngOnInit(): void {
  }
  async getAllPois(){
    await  this.poiService.getPois().subscribe(
      (data) => {
        // @ts-ignore
        this.pois = data;
        console.log(data);
      },
      (error) => console.log("Error: " + error.status + " - " + error.error)
    );
  }
}
