import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/home/navbar/navbar.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PoiContentComponent } from './components/poi/poi-content/poi-content.component';
import { PoiPageComponent } from './components/poi/poi-page/poi-page.component';
import { PoiPlantsComponent } from './components/poi/poi-plants/poi-plants.component';
import { SingleAudioPlayerComponent } from './components/audio/single-audio-player/single-audio-player.component';
import { ChooseLanguageComponent } from './components/home/choose-language/choose-language.component';
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import { QrScannerComponent } from './components/qrCode/qr-scanner/qr-scanner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IntroductionComponent } from './components/home/introduction/introduction.component';
import { TourPageComponent } from './components/tour/tour-page/tour-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomePageComponent,
    PoiContentComponent,
    PoiPageComponent,
    PoiPlantsComponent,
    SingleAudioPlayerComponent,
    ChooseLanguageComponent,
    QrScannerComponent,
    IntroductionComponent,
    TourPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ZXingScannerModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
