import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  getVehicles(params: any): Observable<{ vehicles: any[] }> {
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
    return this.http.get<{ vehicles: any[] }>('/vehicle', {
      params: httpParams,
    });
  }

  getVehicleFilterModels(params: any): Observable<{ models: any[] }> {
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

    return this.http.get<{ models: any[] }>('/vehicle/models', {
      params: httpParams,
    });
  }

  getVehicleFilterBrands(params: any): Observable<{ brands: any[] }> {
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

    return this.http.get<{ brands: any[] }>('/vehicle/brands', {
      params: httpParams,
    });
  }
}
