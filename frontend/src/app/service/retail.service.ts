import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RetailService {
    constructor(private http: HttpClient) { }

    /**
     * Fetches retail items based on filter criteria.
     * @param params Filter params
     * @returns Observable with list of retail items
     */
    getRetailItems(params: any): Observable<{ retail_items: any[] }> {
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
        return this.http.get<{ retail_items: any[] }>('/retail', {
            params: httpParams,
        });
    }

    /**
     * Updates a retail item.
     * @param listing_id 
     * @param type 
     * @param title 
     * @param description 
     * @param price 
     * @param name 
     * @param category_id 
     * @param delivery_options 
     * @param condition 
     * @returns Observable with update response.
     */
    updateRetailItemListing(listing_id: number, type: string, title: string, description: string, price: number, name: string, category_id: number, delivery_options: string, condition: string): Observable<any> {
        return this.http.put("/retail", {
            listing_id: listing_id,
            type: type,
            title: title,
            description: description,
            price: price,
            name: name,
            category_id: category_id,
            delivery_options: delivery_options,
            condition: condition
        })
    }

    /**
     * Creates a retail item listing
     * @param type 
     * @param title 
     * @param description 
     * @param price 
     * @param name 
     * @param category_id 
     * @param delivery_options 
     * @param condition 
     * @returns 
     */
    createRetailListing(type: string, title: string, description: string, price: number, name: string, category_id: number, delivery_options: string, condition: string): Observable<any> {
        return this.http.post("/retail", {
            type: type,
            title: title,
            description: description,
            price: price,
            name: name,
            category_id: category_id,
            delivery_options: delivery_options,
            condition: condition
        })
    }
}