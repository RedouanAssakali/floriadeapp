import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {retry, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  base_path = `http://localhost/floriadeapp/wp/wp-json/wp/v2`;

  getBlogs() {
    return this.http.get<any[]>(this.base_path+"/posts").pipe( retry(2), catchError(this.handleError));
  }

  getMedia(media_id: number) {
    return this.http.get<any>(`${this.base_path}/media/${media_id}`).pipe(retry(2), catchError(this.handleError));
  }



  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
