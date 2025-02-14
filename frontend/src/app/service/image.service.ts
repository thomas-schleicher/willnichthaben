import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ImageService {

    constructor(private http: HttpClient) { }

    /**
     * Upload an image for a specific listing.
     * @param listing_id ID of the listing
     * @param image File to be uploaded
     * @returns Observable with upload response
     */
    uploadImage(listing_id: number, image: File): Observable<any> {
        const formData = new FormData();
        formData.append('image', image);
        return this.http.post(`/listing/${listing_id}/images`, formData);
    }

    /**
     * Get all images for a specific listing.
     * @param listing_id ID of the listing
     * @returns Observable with list of images
     */
    getImages(listing_id: number): Observable<any> {
        return this.http.get(`/listing/${listing_id}/images`);
    }

    /**
     * Delete an image by ID.
     * @param id ID of the image to be deleted
     * @returns Observable with delete response
     */
    deleteImage(image_id: number): Observable<any> {
        return this.http.delete(`/listing/images/${image_id}`);
    }
}
