// real-estate-form.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import {NgFor, NgIf} from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-real-estate-form',
  templateUrl: './real-estate-form.component.html',
  styleUrls: ['./real-estate-form.component.scss'],
  imports: [
    NgFor,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    NgIf
  ],
  standalone: true
})
export class RealEstateFormComponent implements OnInit {
  @Input() data: any = null;
  @Input() modifyMode: boolean = false;

  realEstateForm: FormGroup;

  propertyTypes = [
    { id: 1, name: 'Apartment' },
    { id: 2, name: 'House' },
    { id: 3, name: 'Room' },
    { id: 4, name: 'Studio' },
    { id: 5, name: 'Villa' },
    { id: 6, name: 'Penthouse' }
  ];

  constructor(private fb: FormBuilder) {
    this.realEstateForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.realEstateForm = this.fb.group({
      topLevelCategory: ['houses'],
      type_id: [''],
      name: [''],
      description: [''],
      price_per_month: [''],
      living_area: [''],
      room_count: [''],
      availability: [''],
      immediate_availability: [false],
      kitchen: [false],
      cellar: [false],
      balcony: [false],
      balcony_size: [''],
      garden: [false],
      parking: [false],
      storage_room: [false],
      land_plot_size: [''],
      num_floors: [''],
      province: [''],
      city: [''],
      postal_code: [''],
      street_address: [''],
      title: ['']
    });

    if (this.modifyMode && this.data) {
      this.realEstateForm.patchValue({
        topLevelCategory: this.data.topLevelCategory,
        type_id: this.data.type_id,
        name: this.data.name,
        description: this.data.description,
        price_per_month: this.data.price_per_month,
        living_area: this.data.living_area,
        room_count: this.data.room_count,
        availability: this.data.availability,
        immediate_availability: this.data.immediate_availability,
        kitchen: this.data.kitchen,
        cellar: this.data.cellar,
        balcony: this.data.balcony,
        balcony_size: this.data.balcony_size,
        garden: this.data.garden,
        parking: this.data.parking,
        storage_room: this.data.storage_room,
        land_plot_size: this.data.land_plot_size,
        num_floors: this.data.num_floors,
        province: this.data.address?.province,
        city: this.data.address?.city,
        postal_code: this.data.address?.postalCode,
        street_address: this.data.address?.streetAddress,
        title: this.data.title
      });
    }
  }

  onSubmit(): void {
    if (this.realEstateForm.valid) {
      console.log(this.realEstateForm.value);
      // Handle form submission
    }
  }
}
