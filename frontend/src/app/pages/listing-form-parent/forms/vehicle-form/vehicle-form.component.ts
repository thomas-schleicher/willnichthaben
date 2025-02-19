import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { VehicleService } from '../../../../service/vehicle.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-vehicle-form',
  imports: [
    NgFor,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule
  ],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.scss',
})
export class VehicleFormComponent implements OnInit {
  @Input() data: any = null;
  @Input() modifyMode: boolean = false;

  category_id = '1';

  brands: any[] = [];
  models: any[] = [];

  vehicleForm: FormGroup;
  brandFilter: FormGroup = new FormGroup({});
  modelFilter: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private vehicleService: VehicleService) {
    this.vehicleForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      category_id: this.fb.control(this.category_id),
      price: this.fb.control(''),
      brandFilter: this.brandFilter,
      modelFilter: this.modelFilter,
      type_id: this.fb.control(''),
      date_first_registration: this.fb.control(''),
      mileage: this.fb.control(''),
      fuel_type: this.fb.control(''),
      color: this.fb.control(''),
      condition: this.fb.control(''),
      name: this.fb.control(''),
      description: this.fb.control(''),
      title: this.fb.control(''),
    });

    if (this.modifyMode && this.data) {
      this.vehicleForm.patchValue({
        category_id: this.data.vehicle_category_id,
        price: this.data.price,
        type_id: this.data.vehicle_type_id,
        date_first_registration: this.data.vehicle_date_first_registration,
        mileage: this.data.vehicle_mileage,
        fuel_type: this.data.vehicle_fule_type,
        color: this.data.vehicle_color,
        condition: this.data.vehicle_condition,
        name: this.data.vehicle_name,
        description: this.data.description,
        title: this.data.title,
      });
      
      this.vehicleService.getAllModels(this.data.vehicle_category_id).subscribe((models) => {
        this.models = models.models;
        this.models.forEach((model) => {
          this.modelFilter.addControl(model.id, new FormControl(false));
        });

        if (this.modelFilter.controls[this.data.vehicle_model_id]) {
          this.modelFilter.controls[this.data.vehicle_model_id].setValue(true);
        }
      });

      this.vehicleService.getAllBrands(this.data.vehicle_category_id).subscribe((brands) => {
        this.brands = brands.brands;
        this.brands.forEach((brand) => {
          this.brandFilter.addControl(brand.id, new FormControl(false));
        });

        if (this.brandFilter.controls[this.data.vehicle_brand_id]) {
          this.brandFilter.controls[this.data.vehicle_brand_id].setValue(true);
        }
      });
    } else {
      this.vehicleService.getAllModels(this.category_id).subscribe((models) => {
        this.models = models.models;
        this.models.forEach((model) => {
          this.modelFilter.addControl(model.id, new FormControl(false));
        });
      });
      
      this.vehicleService.getAllBrands(this.category_id).subscribe((brands) => {
        this.brands = brands.brands;
        this.brands.forEach((brand) => {
          this.brandFilter.addControl(brand.id, new FormControl(false));
        });
      }); 
    }

    this.vehicleForm.get('category_id')?.valueChanges.subscribe((value) => {
      this.category_id = value;
      this.ngOnInit();
    }); 
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      console.log(this.vehicleForm.value);

      const {
        name,
        category_id,
        price,
        type_id,
        date_first_registration,
        mileage,
        fuel_type,
        color,
        condition,
        title,
        description,
        modelFilter
      } = this.vehicleForm.value;

      const model_id = Object.keys(modelFilter)
      .filter((key) => modelFilter[key])
      .flatMap((value) => Number(value))[0];

      if (this.modifyMode) {
        this.vehicleService.updateVehicleListing(this.data.id, category_id, price, model_id, type_id, date_first_registration, mileage, fuel_type, color, condition, 'vehicle', name, title, description).subscribe();
      } else {
        this.vehicleService.createVehicle(price, model_id, type_id, date_first_registration, mileage, fuel_type, color, condition, 'vehicle', name, title, description).subscribe();
      }
    }
  }
}
