import { Component, Input } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ListingService } from '../../service/listing.service';
import { VehicleSubheaderComponent } from '../vehicle/vehicle-subheader/vehicle-subheader.component';

@Component({
  selector: 'app-listing',
  imports: [SidebarComponent, VehicleSubheaderComponent],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})

//todo: machts da eure sachen so wie ihr sie brauchts auch rein

export class ListingComponent {
  @Input() listingID!: number;
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
  
  constructor (private listingService: ListingService) {}

  ngOnInit() {
    this.listingService.getListing(this.listingID).subscribe(listing => {
      this.type = listing.type;
      this.title = listing.title;
      this.seller_name = listing.user_email;
      this.address = listing.city + " " + listing.postal_code + ", " + listing.street_address;
      this.price = listing.price;
      this.description = listing.description;
      
      this.vehicle_name = listing.vehicle_name;
      this.vehicle_date_first_registered = listing.vehicle_date_first_registered;
      this.vehicle_mileage = listing.vehicle_mileage;
      this.vehicle_fuel_type = listing.vehicle_fule_type;
      this.vehicle_color = listing.vehicle_color;
      this.vehicle_condition = listing.vehicle_condition;
      this.vehicle_model_name = listing.vehicle_model_name;
      this.vehicle_mark_name = listing.vehicle_mark_name;
      this.vehicle_type = listing.vehicle_type;

      switch (this.type) {
        case "vehicle": {
          break;
        }
        case "retail": {
          break;

        }
        case "property": {
          break;
        }
        default: {
          break;
        }
      }
    });
  }  
}