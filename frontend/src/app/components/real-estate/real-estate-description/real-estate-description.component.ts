import { Component, Input } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-real-estate-description',
  imports: [
    NgIf
  ],
  templateUrl: './real-estate-description.component.html',
  styleUrl: './real-estate-description.component.scss'
})
export class RealEstateDescriptionComponent {
  @Input() living_area?: string;
  @Input() room_count?: number;
  @Input() availability?: string;
  @Input() kitchen: boolean | null = null;
  @Input() cellar: boolean | null = null;
  @Input() address?: string;
  @Input() property_type?: string;
  @Input() renting_period?: string;
  @Input() balcony: boolean | null = null;
  @Input() parking: boolean | null = null;
  @Input() balcony_size?: number;
  @Input() garden: boolean | null = null;
  @Input() storage_room: boolean | null = null;
  @Input() land_plot_size?: number;
  @Input() num_floors?: number;
  @Input() term_type?: string;
  @Input() price_per_month?: string;
  @Input() advance_payment?: string;
  @Input() immediate_availability: boolean | null = null;

  ngOnChanges() {
    if (this.availability) {
      const date: Date = new Date(this.availability);
      this.availability = `${date.getMonth() + 1}/${date.getFullYear()}`;
    }
  }
}
