import { CommonModule, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-vehicle-filter',
  imports: [ReactiveFormsModule, NgFor, MatExpansionModule, MatCheckboxModule, CommonModule],
  templateUrl: './vehicle-filter.component.html',
  styleUrl: './vehicle-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleFilterComponent {
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();

  vehicleForm: FormGroup;

  brands = [
    {
      name: 'bmw',
      id: 1,
    },
    {
      name: 'audi',
      id: 2,
    },
  ];

  constructor(private fb: FormBuilder) {
    const brandFilter: FormGroup = new FormGroup({});

    this.vehicleForm = this.fb.group({
      price_min: this.fb.control(''),
      price_max: this.fb.control(''),
      brandFilter,
      // brand_ids: this.fb.group({}), //delete this if I keep the other defenitino
      // model_ids: this.fb.array([]),
      // type_ids: this.fb.array([]),
      // date_first_registration_start: this.fb.control(''),
      // date_first_registration_end: this.fb.control(''),
      // mileage_min: this.fb.control(''),
      // mileage_max: this.fb.control(''),
      // fuel_types: this.fb.array([]),
      // colors: this.fb.array([]),
      // conditions: this.fb.array([]),
    });

    this.brands.forEach((brand) => {
      brandFilter.addControl(brand.name, new FormControl(brand.id));
    });

    console.log(this.vehicleForm);
  }
}
