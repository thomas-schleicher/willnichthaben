import { Component, Input, numberAttribute } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ListingService } from '../../service/listing.service';
import { VehicleSubheaderComponent } from '../vehicle/vehicle-subheader/vehicle-subheader.component';
import { VehicleDescriptionComponent } from '../vehicle/vehicle-description/vehicle-description.component';
import { RetailItemSubheaderComponent } from '../retail_item/retail_item-subheader/retail_item-subheader.component';
import { RetailItemDescriptionComponent } from '../retail_item/retail_item-description/retail_item-description.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ImageReelComponent } from '../image-reel/image-reel.component';
import {RealEstateSubheaderComponent} from '../real-estate/real-estate-subheader/real-estate-subheader.component';
import {RealEstateDescriptionComponent} from '../real-estate/real-estate-description/real-estate-description.component';

@Component({
  selector: 'app-listing',
  imports: [SidebarComponent, ImageReelComponent, VehicleSubheaderComponent, RetailItemSubheaderComponent, VehicleDescriptionComponent, RetailItemDescriptionComponent, NgIf, CommonModule, RealEstateSubheaderComponent, RealEstateDescriptionComponent],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})

//todo: machts da eure sachen so wie ihr sie brauchts auch rein

export class ListingComponent {
  @Input({transform:numberAttribute}) id!: number;
  type: string = '';

  //general properties of a listing
  title: string = '';
  subtitle: string = '';
  seller_name: string = '';
  address: string = '';
  price: number = -1;
  description: string = '';

  //vehicle properties
  vehicle_name: string = '';
  vehicle_date_first_registered: string = "";
  vehicle_mileage: number = -1;
  vehicle_fuel_type: string = '';
  vehicle_color: string = '';
  vehicle_condition: string = '';
  vehicle_model_name: string = '';
  vehicle_mark_name: string = '';
  vehicle_type: string = '';

  // retail properties
  retail_item_name: string = '';
  retail_item_delivery_options: string = '';
  retail_item_condition: string = '';

  //real-estate
  availability: string = '';
  living_area: string = '';
  property_type: string = '';

  property_room_count: number = -1;
  property_kitchen: boolean = false;
  property_cellar: boolean = false;
  property_address: string = '';
  property_renting_period: string = '';
  property_balcony: boolean = false;
  property_parking: boolean = false;

  constructor (private listingService: ListingService) {}

  ngOnInit() {
    this.listingService.getListing(this.id).subscribe(listing => {
      this.type = listing.type;
      this.title = listing.title;
      this.seller_name = listing.user_email;
      this.address = listing.city + " " + listing.postal_code + ", " + listing.street_address;
      this.price = listing.price;
      this.description = listing.description;

      this.vehicle_name = listing.vehicle_name;
      this.vehicle_date_first_registered = listing.vehicle_date_first_registration;
      this.vehicle_mileage = listing.vehicle_mileage;
      this.vehicle_fuel_type = listing.vehicle_fule_type;
      this.vehicle_color = listing.vehicle_color;
      this.vehicle_condition = listing.vehicle_condition;
      this.vehicle_model_name = listing.vehicle_model_name;
      this.vehicle_mark_name = listing.vehicle_mark_name;
      this.vehicle_type = listing.vehicle_type;

      this.retail_item_name = listing.retail_name;
      this.retail_item_delivery_options = listing.retail_delivery_options;
      this.retail_item_condition = listing.retail_condition;

      this.availability = listing.availability;
      this.living_area = listing.living_area;
      this.property_type = listing.property_type;

      this.property_room_count = listing.room_count;
      this.property_kitchen = listing.kitchen;
      this.property_cellar = listing.cellar;
      this.property_address = listing.address;
      this.property_renting_period = listing.renting_period;
      this.property_balcony = listing.balcony;
      this.property_parking = listing.parking;
    });
  }
}
