import { Component, OnInit } from '@angular/core';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faQrcode  = faQrcode;
  constructor() { }

  ngOnInit(): void {
  }

}
