import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {PoiService} from "../../../services/poi.service";
import {Poi} from "../../../models/poi";
import {TourService} from "../../../services/tour.service";
import {Tour} from "../../../models/Tour";

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {
  active = 1;
  pois: Poi[];
  inTour: Poi[] = [];

  notTour: Poi[] = [];


  tours: Tour[];

  constructor(private poiService: PoiService, private tourService: TourService) {
  }

  ngOnInit(): void {
    this.getAllPois();
    this.getAllTours();

  }


  getAllPois() {
    this.poiService.getPois().subscribe(
      (data) => {

        for (const poi of data) {
          if (poi.is_tour == true) {
            this.inTour.push(poi);
          } else {
            this.notTour.push(poi)
          }
        }
        console.log(this.inTour);
        return data;
      });

  }

  getAllTours(){
    this.tourService.getAllTours().subscribe(
      (data) => {
        this.tours = data
        console.log(this.tours)
      });

  }

  sequence() {
    console.log(this.pois)
    for (const poi of this.pois) {
      if (poi.is_tour == true) {
        this.inTour.push(poi);
      } else {
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
