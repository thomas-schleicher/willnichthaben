import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http: HttpClient) { }

  getListing(listingID: number): Observable<any> {
    return this.http.get("/listing/" + listingID.toString());
  }
  
  getUserListings(): Observable<any> {
    return this.http.get("/listing");
  }
}
