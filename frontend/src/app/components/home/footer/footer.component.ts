import { Component, OnInit } from '@angular/core';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {QrScannerComponent} from "../../qrCode/qr-scanner/qr-scanner.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faQrcode  = faQrcode;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openScanner() {
    this.modalService.open(QrScannerComponent)
  }
}
