import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {PoiService} from "../../../services/poi.service";
import {Poi} from "../../../models/poi";

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {
  active = 1;
  pois:  Poi[] ;
  inTour : Poi[] = [];

  notTour: Poi[] = [];


  constructor(private poiService: PoiService) {
    // this.getAllPois();
  }

  ngOnInit(): void {

 this.poiService.getPois().subscribe(
      (data) => {

        for (const poi of data) {
          if (poi.is_tour == true){
            this.inTour.push(poi);
          }else{
            this.notTour.push(poi)
          }
        }
        console.log(this.inTour);
        return data;
      });
    // this.sequence();
console.log(this.pois)
  }



  //
  //  getAllPois():Poi[] {
  //   let dataP;
  //    this.poiService.getPois().subscribe(
  //     (data) => {
  //       // @ts-ignore
  //       dataP = data;
  //       console.log(data);
  //       return data
  //     },
  //     (error) => console.log("Error: " + error.status + " - " + error.error)
  //   );
  //   return dataP;
  //
  // }

  sequence(){
    console.log(this.pois)
    for (const poi of this.pois) {
      if (poi.is_tour == true){
        this.inTour.push(poi);
      }else{
        this.notTour.push(poi)
      }
  console.log(poi)
    }
  }

  drop(event: CdkDragDrop<Poi[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
