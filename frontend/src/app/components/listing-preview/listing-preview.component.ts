import { Component, Input } from '@angular/core';
import { VehicleSubheaderComponent } from '../vehicle/vehicle-subheader/vehicle-subheader.component';
import { NgIf } from '@angular/common';
import { ImageService } from '../../service/image.service'
import { RetailItemSubheaderComponent } from '../retail_item/retail_item-subheader/retail_item-subheader.component';

@Component({
  selector: 'app-listing-preview',
  imports: [VehicleSubheaderComponent, RetailItemSubheaderComponent, NgIf],
  templateUrl: './listing-preview.component.html',
  styleUrls: ['./listing-preview.component.scss']
})
export class ListingPreviewComponent {
  @Input() type!: string;
  @Input() id!: string;
  @Input() title!: string;
  @Input() price!: number;

  @Input() mileage: number = -1;
  @Input() date_first_registration: string = "";
  @Input() condition: string = "";

  @Input() name: string = "";
  @Input() delivery_options: string = "";
  @Input() retail_item_condition: string = "";

  listingURL: string = "";
  imageURL: string = "";

  private defaultImage: string = "assets/default-preview.jpg";

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.listingURL = `/listing/${this.id}`;

    // load the first image from the database
    this.imageService.getImages(Number(this.id)).subscribe((data: any) => {
      if (data.images.length > 0) {
        this.imageURL = `http://localhost:3000${data.images[0].image_url}`; // use first image
      } else {
        this.imageURL = this.defaultImage; // if no image exists, use standard image
      }
    }, error => {
      console.error("Error loading preview image:", error);
      this.imageURL = this.defaultImage; // in case of API error, use standard image
    });
  }
}
