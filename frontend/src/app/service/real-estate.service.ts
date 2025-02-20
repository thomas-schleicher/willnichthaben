import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class RealEstateService {
  constructor(private http: HttpClient) {}

  getRealEstateObjects(params: any): Observable<{ listings: any[] }> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        if (Array.isArray(params[key])) {
          params[key].forEach((value: any) => {
            httpParams = httpParams.append(key, value);
          });
        } else {
          httpParams = httpParams.append(key, params[key]);
        }
      }
    });
    return this.http.get<{ listings: any[] }>('/real_estate', {
      params: httpParams,
    });
  }

  getAllCities(): Observable<{ cities: any[] }> {
    return this.http.get<{ cities: any[] }>('/real_estate/cities').pipe(
      map(response => ({
        cities: response.cities.map(city => ({
          id: city.id,
          name: city.name,
          province_id: city.province_id,
          province_name: city.province_name
        }))
      }))
    );
  }

  getAllProvinces(): Observable<{ provinces: any[] }> {
    return this.http.get<{ provinces: any[] }>('/real_estate/provinces').pipe(
        tap(response => console.log('Raw response from server:', response)),
        map(response => ({
          provinces: response.provinces.map(province => ({
            id: province.id,
            name: province.name,
            plz_range: province.plz_range
          }))
        })),
        catchError(error => {
          console.error('Error in provinces request:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          throw error;
        })
    );
  }

  createListing(data: any): Observable<any> {
    return this.http.post('/real_estate/', data);
  }

  updateListing(data: any): Observable<any> {
    return this.http.put('/real_estate/', data);
  }

}
