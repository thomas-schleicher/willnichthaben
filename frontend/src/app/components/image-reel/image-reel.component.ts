import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from '../../service/image.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
    selector: 'app-image-reel',
    templateUrl: './image-reel.component.html',
    styleUrls: ['./image-reel.component.scss'],
    imports: [CommonModule, NgFor]
})

export class ImageReelComponent implements OnInit {
    @Input() listing_id!: number;

    images: {
        id: number,
        image_url: string
    }[] = [];
    selectedFile: File | null = null;

    constructor(private imageService: ImageService) {}

    ngOnInit(): void {
        this.loadImages();
    }

    /**
     * Load images for the given listing ID.
     */
    loadImages() {
        this.imageService.getImages(this.listing_id).subscribe((data: any) => {
            this.images = data.images; // expects an array containing { id, image_url }
        });
    }

    /**
     * Selects an image for upload.
     * @param event File input change event
     */
    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
        }
    }

    /**
     * Uploads the selected image.
     */
    uploadImage() {
        if (this.selectedFile) {
            this.imageService.uploadImage(this.listing_id, this.selectedFile).subscribe(() => {
                this.loadImages(); // reload after upload
                this.selectedFile = null;
            });
        }
    }
    
    /**
     * Deletes an image by ID.
     * @param idimage_id 
     */
    deleteImage(image_id: number) {
        this.imageService.deleteImage(image_id).subscribe(() => {
            console.log("I'm here");
            this.images = this.images.filter(img => img.id !== image_id); // remove immediately from UI
        });
    }
}