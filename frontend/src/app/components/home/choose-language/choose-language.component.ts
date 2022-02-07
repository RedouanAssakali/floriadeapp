import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-choose-language',
  templateUrl: './choose-language.component.html',
  styleUrls: ['./choose-language.component.css']
})



export class ChooseLanguageComponent implements OnInit {
  @Output()
  lng =  new EventEmitter<boolean>();


  constructor() { }

  ngOnInit(): void {
  }

  clickedLng(){
    this.lng.emit(true);
    console.log(true);
  }

}
