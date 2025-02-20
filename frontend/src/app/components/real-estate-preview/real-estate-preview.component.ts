import { Component, Input } from '@angular/core';
import {ImageService} from '../../service/image.service';

@Component({
  selector: 'app-real-estate-preview',
  templateUrl: './real-estate-preview.component.html',
  styleUrl: './real-estate-preview.component.scss'
})
export class RealEstatePreviewComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Input() property_type!: string;
  @Input() price!: number;
  @Input() living_area!: number;
  @Input() room_count!: number;
  @Input() availability!: string;
  @Input() location!: string;
  @Input() imageURL!: string;

  get listingURL(): string {
    return `/listing/${this.id}`;
  }

  private defaultImage: string = "assets/default-preview.jpg";

  constructor(private imageService: ImageService) {}

  ngOnInit() {

    // load the first image from the database
    this.imageService.getImages(Number(this.id)).subscribe((data: any) => {
      console.log("Im here");
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
