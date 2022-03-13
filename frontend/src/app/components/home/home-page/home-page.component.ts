import {Component, Input, OnInit} from '@angular/core';
import {Poi} from "../../../models/poi";
import {PoiService} from "../../../services/poi.service";
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @Input()
 lang = localStorage.getItem('lang');
  pois: Poi[]
  faArrowCircleRight=faAngleRight;
  constructor(private poisServce: PoiService) { }

  ngOnInit(): void {
    this.getPois();
  }

  getPois(){
    this.poisServce.getPois().subscribe((data)=> {
        this.pois = data
      console.log(data)
      }
    )
  }

}
