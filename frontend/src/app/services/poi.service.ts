import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, share} from "rxjs";
import {Poi} from "../models/poi";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {PoiContent} from "../models/poiContent";

@Injectable({
  providedIn: 'root'
})
export class PoiService {
  private poi: Poi;

  constructor(private router: Router, private http: HttpClient
  ) {
  }

  getPois(): Observable<Poi[]> {
    return this.http.get<Poi[]>(`${environment.apiUrl}/pois`).pipe(
      map((restPois: Poi[]) => {
        const pois: Poi[] = [];
        for (const poi of restPois) {
          pois.push(poi);
        }

        return pois;
      }));
  }


    getPoiById(poiId: number): Observable<Poi> {
      return this.http.get<Poi[]>(`${environment.apiUrl}/pois/${poiId}`).pipe(
        map((restPoi: any) => {
          let poi: Poi ;
          poi = restPoi

          this.poi = poi ;
          return poi;
        }));
    }






  createPoi(poi: Poi) {
    const observable = this.http.post(`${environment.apiUrl}/pois`,
      {name: poi.name, lat: poi.lat, long: poi.long},
    ).pipe(share());

    observable.subscribe((data) => {
        console.log(data);
      },
      (err) => {
        console.log('creation error', err);
      });

    return observable;
  }


  deletePoi(poiID: number) {
    this.http.delete<Poi>(`${environment.apiUrl}/pois/${poiID}`)
      .subscribe(() =>  console.log('Delete successful'));
  }


  updatePoi(poi: Poi) {
    const observable = this.http.put(`${environment.apiUrl}/pois/${poi.id}`,
      {name: poi.name, lat: poi.lat, long: poi.long, hasContent: poi.hasContent},
    ).pipe(share());

    observable.subscribe((data) => {
        console.log(data);
      },
      (err) => {
        console.log('creation error', err);
      });

    return observable;
  }


  createPoiContent(poiContent: PoiContent) {
    const observable = this.http.post(`${environment.apiUrl}/poicontent`,
      {poi_id: poiContent.poiId, language: poiContent.lang, title: "Title works!",body: "Body Works!"},
    ).pipe(share());

    observable.subscribe((data) => {
        console.log(data);
      },
      (err) => {
        console.log('creation error', err);
      });

    return observable;
  }

  getPoiContent(poiId: number, lang:string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/poicontent/${poiId}/${lang}`).pipe(
      map((restPoi: any[]) => {
        console.log(restPoi[0])
        return restPoi;
      }));
  }

  updatePoiContent(poiContent: PoiContent) {
    const observable = this.http.put(`${environment.apiUrl}/poicontent/${poiContent.poiId}/${poiContent.lang}`,
      {poi_id: poiContent.poiId, language: poiContent.lang, title: poiContent.title,body: poiContent.body},
    ).pipe(share());

    observable.subscribe((data) => {
        console.log(data);
      },
      (err) => {
        console.log('creation error', err);
      });

    return observable;
  }





}
