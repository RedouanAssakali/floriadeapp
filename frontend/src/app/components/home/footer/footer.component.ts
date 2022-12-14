import { Component, OnInit } from '@angular/core';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {QrScannerComponent} from "../../qrCode/qr-scanner/qr-scanner.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faQrcode  = faQrcode;
  lang = localStorage.getItem('lang');
  event: Event & { target: HTMLInputElement }

  constructor(private modalService: NgbModal, public router: Router) { }

  ngOnInit(): void {

  }

  openScanner() {
    this.modalService.open(QrScannerComponent)
  }

  changeLang(lang: any){

    localStorage.setItem('lang',lang);
    window.location.reload();
  }
}
