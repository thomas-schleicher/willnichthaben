import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  setListingSold(id: number): Observable<any> {
    return this.http.put("/listing/" + id.toString(), {});
  }

  constructor(private http: HttpClient) { }

  getListing(listingID: number): Observable<any> {
    return this.http.get("/listing/" + listingID.toString());
  }

  getListingAuthenticated(listingID: number): Observable<any> {
    return this.http.get("/listing/auth/" + listingID.toString());
  }

  getUserListings(): Observable<any> {
    return this.http.get("/listing");
  }

  deleteListing(listingID: number): Observable<any> {
    return this.http.delete("/listing/" + listingID.toString());
  }

  // TODO: create logic to save
}
