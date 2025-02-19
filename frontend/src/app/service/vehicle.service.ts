import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
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

  getAllModels(id: string): Observable<{ models: any[]}> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('category_id', id);
    return this.http.get<{ models: any[] }>('/vehicle/models', {
      params: httpParams,
    }); 
  }

  getAllBrands(id: string): Observable<{ brands: any[]}> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('category_id', id);
    return this.http.get<{ brands: any[] }>('/vehicle/brands', {
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

  updateVehicleListing(listing_id: number, category_id: number, price: number, model_id: number, type_id: number, date_first_registration: string, mileage: number, fuel_type: string, color: string, condition: string, type: string, name: string, title: string, description: string): Observable<any> {
    return this.http.put("/vehicle", {
      category_id: category_id,
      type: type,
      listing_id: listing_id,
      price: price,
      model_id: model_id,
      type_id: type_id,
      date_first_registration: date_first_registration,
      mileage: mileage,
      fuel_type: fuel_type,
      color: color,
      condition: condition,
      name: name,
      title: title,
      description: description,
    })
  }

  createVehicle(price: number, model_id: number, type_id: number, date_first_registration: string, mileage: number, fuel_type: string, color: string, condition: string, type: string, name: string, title: string, description: string): Observable<any> {
    return this.http.post("/vehicle", {
      type: type,
      price: price,
      model_id: model_id,
      type_id: type_id,
      date_first_registration: date_first_registration,
      mileage: mileage,
      fuel_type: fuel_type,
      color: color,
      condition: condition,
      name: name,
      title: title,
      description: description,
    });
  }
}
