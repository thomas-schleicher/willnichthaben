import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgSwitch, NgSwitchCase, NgSwitchDefault, CommonModule } from '@angular/common';

import { VehicleFormComponent } from './forms/vehicle-form/vehicle-form.component';
import { RetailFormComponent } from './forms/retail-form/retail-form.component';
import { RealEstateFormComponent } from './forms/real-estate-form/real-estate-form.component';

import { ListingService } from '../../service/listing.service';

@Component({
  selector: 'app-form-parent',
  templateUrl: './listing-form-parent.component.html',
  styleUrls: ['./listing-form-parent.component.scss'],
  imports: [
    RealEstateFormComponent,
    NgSwitch,
    VehicleFormComponent,
    RetailFormComponent,
    NgSwitchCase,
    NgSwitchDefault,
    CommonModule
  ],
  standalone: true
})
export class ListingFormParentComponent implements OnInit {
  selectedForm: string = 'none';
  isModifyMode: boolean = false;
  listingId: number | null = null;
  listingData: any = null; // Will hold the fetched listing data.

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('listing_id');
      if (id) {
        this.isModifyMode = true;
        this.listingId = +id;
        console.log('Modify mode for listing:', id);
        this.prefillData();
      } else {
        this.isModifyMode = false;
        console.log('Create new listing');
      }
    });
  }

  onSelectForm(form: string): void {
    if (!this.isModifyMode) {
      this.selectedForm = form;
    }
  }

  prefillData(): void {
    this.listingService.getListingAuthenticated(<number>this.listingId).subscribe(listing => {
      this.listingData = listing;
      // Optionally, set component-level fields here if needed:
      // e.g. this.title = listing.title; etc.

      // Automatically select the form based on the listing type.
      // Adjust the condition values based on your actual listing type values.
      if (listing.type === 'retail') {
        this.selectedForm = 'retailForm';
      } else if (listing.type === 'real-estate') {
        this.selectedForm = 'realEstateForm';
      } else if (listing.type === 'vehicle') {
        this.selectedForm = 'vehicleForm';
      } else {
        this.selectedForm = 'none';
      }
    });
  }
}
