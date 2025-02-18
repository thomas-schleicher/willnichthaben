import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post("/auth/login", {
      email: email,
      password: password,
    });
  }

  logout(): Observable<any> {
    return this.http.post("/auth/logout", {});
  }

  signup(email: string, password: string, city: string, postal_code: string, street_address: string): Observable<any> {
    return this.http.post("/auth/signup", {
      email: email,
      password: password,
      city: city,
      postal_code: postal_code,
      street_address: street_address,
    });
  }

  isAuthenticated(): Observable<{status: boolean}> {
    return this.http.get<{status: boolean}>("/auth");
  }
}
