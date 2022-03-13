import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Tour} from "../models/Tour";

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private router: Router, private http: HttpClient) {
  }


  getAllTours(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/tours`).pipe(
      map((restTour: any[]) => {
        let tours: Tour[] = []
        for (const restTourElement of restTour) {
          tours.push(restTourElement)

        }

        return tours;
      }));
  }


  getTourById(tourId: number): Observable<Tour> {
    return this.http.get<Tour[]>(`${environment.apiUrl}/tour/${tourId}`).pipe(
      map((restTour: any) => {

        return restTour;
      }));
  }

  //
  // createPoi(tour: Tour) {
  //   const observable = this.http.post(`${environment.apiUrl}/tour`,
  //     {name: tour.name, lat: tour., long: tour.long},
  //   ).pipe(share());
  //
  //   observable.subscribe((data) => {
  //       console.log(data);
  //     },
  //     (err) => {
  //       console.log('creation error', err);
  //     });
  //
  //   return observable;
  // }


}
