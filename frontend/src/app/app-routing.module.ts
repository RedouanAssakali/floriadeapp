import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./components/home/home-page/home-page.component";
import {PoiPageComponent} from "./components/poi/poi-page/poi-page.component";
import {QrScannerComponent} from "./components/qrCode/qr-scanner/qr-scanner.component";
import {TourPageComponent} from "./components/tour/tour-page/tour-page.component";
import {LoginComponent} from "./components/admin/forms/login/login.component";
import {AdminpageComponent} from "./components/admin/adminpage/adminpage.component";
import {AuthGuard} from "./helpers/auth.guard";
import {PoisComponent} from "./components/admin/pois/pois.component";
import {EditPoiComponent} from "./components/admin/edit-poi/edit-poi.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'poi', component: PoiPageComponent},
  {path: 'scanner', component: QrScannerComponent},
  {path: 'tour', component: TourPageComponent},

  {path: 'login', component: LoginComponent},
  {
    path: 'admin', component: AdminpageComponent, canActivate: [AuthGuard],
    children: [
      {path: 'poi', component: PoisComponent},
      {path: 'poi/edit/:id', component:EditPoiComponent},
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
