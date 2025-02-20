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
  property_kitchen: boolean | null = null;
  property_cellar: boolean | null = null;
  property_address: string = '';
  property_renting_period: string = '';
  property_balcony: boolean | null = null;
  property_parking: boolean | null = null;
  property_balcony_size?: number;
  property_garden: boolean | null = null;
  property_storage_room: boolean | null = null;
  property_land_plot_size?: number;
  property_num_floors?: number;
  property_term_type: string = '';
  property_price_per_month: string = '';
  property_advance_payment: string = '';
  property_immediate_availability: boolean | null = null;

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
      this.property_type = listing.type;
      this.property_room_count = listing.room_count;
      this.property_kitchen = listing.kitchen;
      this.property_cellar = listing.cellar;
      this.property_address = listing.address.streetAddress;
      this.property_renting_period = listing.renting_period;
      this.property_balcony = listing.balcony;
      this.property_parking = listing.parking;
      this.property_balcony_size = listing.balcony_size ? Number(listing.balcony_size) : undefined;
      this.property_garden = listing.garden;
      this.property_storage_room = listing.storage_room;
      this.property_land_plot_size = listing.land_plot_size ? Number(listing.land_plot_size) : undefined;
      this.property_num_floors = listing.num_floors ? Number(listing.num_floors) : undefined;
      this.property_term_type = listing.term_type;
      this.property_price_per_month = listing.price_per_month;
      this.property_advance_payment = listing.advance_payment;
      this.property_immediate_availability = listing.immediate_availability;
    });
  }
}
