import { Component, Input } from '@angular/core';
import { VehicleSubheaderComponent } from '../vehicle/vehicle-subheader/vehicle-subheader.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-listing-preview',
  imports: [VehicleSubheaderComponent, NgIf],
  templateUrl: './listing-preview.component.html',
  styleUrl: './listing-preview.component.scss'
})
export class ListingPreviewComponent {
  @Input() type!: string;
  @Input() id!: string;
  @Input() title!: string;
  @Input() price!: number;

  @Input() mileage: number = -1;
  @Input() date_first_registration: string = "";
  @Input() condition: string = "";

  listingURL: string = "";

  ngOnInit() {
    this.listingURL = `/listing/${this.id}`;
  }

  //todo: fetch this from the database
  imgURL: string = "https://cache.willhaben.at/mmo/8/115/442/4908_-764871854_hoved.jpg";
}
