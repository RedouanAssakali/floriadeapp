import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-choose-language',
  templateUrl: './choose-language.component.html',
  styleUrls: ['./choose-language.component.css']
})



export class ChooseLanguageComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  changeLang(lang: any){

    localStorage.setItem('lang',lang);
    window.location.reload();
  }



}
