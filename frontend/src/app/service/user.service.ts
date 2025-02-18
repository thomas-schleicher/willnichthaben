import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}
  
  changePassword(newPassword: string): Observable<any> {
    return this.http.put("/user/password", {
      password: newPassword,
    });
  }

  changeAddress(newCity: string, newPostalCode: string, newStreetAddress: string) : Observable<any> {
    return this.http.put("/user/address", {
      city: newCity,
      postal_code: newPostalCode,
      street_address: newStreetAddress,
    });
  }
}