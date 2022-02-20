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
  private pois: Poi[];
  private poi: Poi;

  constructor(private router: Router, private http: HttpClient
  ) {
  }

  getPois(): Observable<Poi[]> {
    return this.http.get<Poi[]>(`${environment.apiUrl}/pois`).pipe(
      map((restPois: any[]) => {
        const pois: Poi[] = [];
        for (const poi of restPois) {
          pois.push(poi);
        }
        this.pois = pois;
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




  getPoiContent(poiId: number, lang:string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/poicontent/${poiId}/${lang}`).pipe(
      map((restPoi: any[]) => {
        console.log(restPoi[0])
        return restPoi;
      }));
  }




}
