import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Poi} from "../models/poi";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PoiService {
  private pois: Poi[];

  constructor(private router: Router, private http: HttpClient
  ){}

  getPois():Observable<Poi[]> {
    return this.http.get<Poi[]>(`${environment.apiUrl}/pois`).pipe(
      map( (restPois: any[]) => {
        const pois: Poi[] = [];
        for (const poi of restPois) {
          pois.push(poi);
        }
        this.pois = pois;
        return pois;
      }));
  }
}
