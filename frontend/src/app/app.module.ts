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
    ChooseLanguageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
