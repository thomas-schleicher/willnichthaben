import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import {JsonPipe, NgFor, NgIf} from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RealEstateService } from '../../../../service/real-estate.service';

@Component({
  selector: 'app-real-estate-form',
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    JsonPipe
  ],
  templateUrl: './real-estate-form.component.html',
  styleUrl: './real-estate-form.component.scss',
  standalone: true
})
export class RealEstateFormComponent implements OnInit {
  @Input() data: any = null;
  @Input() modifyMode: boolean = false;

  realEstateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private realEstateService: RealEstateService
  ) {
    this.realEstateForm = this.fb.group({
      topLevelCategory: ['houses'],
      type_ids: [[]],
      listing_id: [''],
      province_id: [''],
      city_ids: [[]],
      price: [''],
      renting_period: [''],
      immediate_availability: [false],
      living_area: [''],
      room_count: [''],
      amenities: this.fb.group({
        balcony: [false],
        balcony_size: [''],
        garden: [false],
        parking: [false],
        storage_room: [false],
        kitchen: [false],
        cellar: [false]
      }),
      land_plot_size_min: [''],
      land_plot_size_max: [''],
      num_floors: [''],
      postal_code: ['']
    });

    // Add conditional validation for balcony size
    this.realEstateForm.get('amenities.balcony')?.valueChanges.subscribe(hasBalcony => {
      const balconySizeMinControl = this.realEstateForm.get('amenities.balcony_size_min');
      const balconySizeMaxControl = this.realEstateForm.get('amenities.balcony_size_max');
      if (hasBalcony) {
        balconySizeMinControl?.setValidators(Validators.min(0));
        balconySizeMaxControl?.setValidators(Validators.min(0));
      } else {
        balconySizeMinControl?.clearValidators();
        balconySizeMaxControl?.clearValidators();
        balconySizeMinControl?.setValue('');
        balconySizeMaxControl?.setValue('');
      }
      balconySizeMinControl?.updateValueAndValidity();
      balconySizeMaxControl?.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    if (this.modifyMode && this.data) {
      const formData = {
        ...this.data,
        amenities: {
          balcony: this.data.balcony || false,
          balcony_size_min: this.data.balcony_size_min || '',
          balcony_size_max: this.data.balcony_size_max || '',
          garden: this.data.garden || false,
          parking: this.data.parking || false,
          storage_room: this.data.storage_room || false,
          kitchen: this.data.kitchen || false,
          cellar: this.data.cellar || false
        }
      };

      this.realEstateForm.patchValue(formData);
    }
  }

  onSubmit(): void {
    if (this.realEstateForm.valid) {
      const formData = {
        ...this.realEstateForm.value,
        ...this.realEstateForm.value.amenities
      };
      delete formData.amenities;

      // Remove empty fields to match schema expectations
      Object.keys(formData).forEach(key => {
        if (formData[key] === '' || formData[key] === null) {
          delete formData[key];
        }
      });

      if (this.modifyMode) {
        this.realEstateService.updateListing(formData).subscribe({
          next: (response) => {
            console.log('Property updated successfully', response);
          },
          error: (error) => {
            console.error('Error updating property', error);
          }
        });
      } else {
        this.realEstateService.createListing(formData).subscribe({
          next: (response) => {
            console.log('Property created successfully', response);
          },
          error: (error) => {
            console.error('Error creating property', error);
          }
        });
      }
    }
  }
}
