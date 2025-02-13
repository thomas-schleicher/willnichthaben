import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { VehicleService } from '../../../service/vehicle.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-vehicle-filter',
  imports: [
    ReactiveFormsModule,
    NgFor,
    MatExpansionModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './vehicle-filter.component.html',
  styleUrl: './vehicle-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleFilterComponent {
  vehicleForm: FormGroup;
  brandFilter: FormGroup = new FormGroup({});
  modelFilter: FormGroup = new FormGroup({});

  brands: any[] = [];
  models: any[] = [];

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.vehicleForm = this.fb.group({
      category_id: this.fb.control(''),
      price_min: this.fb.control(''),
      price_max: this.fb.control(''),
      brandFilter: this.brandFilter,
      modelFilter: this.modelFilter,
      type_ids: this.fb.control(''),
      date_first_registration_start: this.fb.control(''),
      date_first_registration_end: this.fb.control(''),
      mileage_min: this.fb.control(''),
      mileage_max: this.fb.control(''),
      fuel_types: this.fb.control(''),
      colors: this.fb.control(''),
      conditions: this.fb.control(''),
    });
  }

  submitFilter() {
    let params: { [param: string]: any } = {};
    let model_ids: number[] = [];
    let brand_ids: number[] = [];

    Object.keys(this.vehicleForm.controls).forEach((key) => {
      const control = this.vehicleForm.get(key);

      if (key === 'brandFilter') {
        brand_ids = Object.keys(control?.value)
          .filter((key) => control?.value[key])
          .flatMap((value) => Number(value));
        params['brand_ids'] = brand_ids;
      } else if (key === 'modelFilter') {
        model_ids = Object.keys(control?.value)
          .filter((key) => control?.value[key])
          .flatMap((value) => Number(value));
        params['model_ids'] = model_ids;
      } else if (control?.value) {
        if (key == 'date_first_registration_start') {
          params[key] = new Date(control.value).toISOString();
        } else if (key == 'date_first_registration_end') {
          params[key] = new Date(control.value).toISOString();
        } else if (key == 'colors') {
          params[key] = control.value.toLowerCase();
        } else {
          params[key] = control.value;
        }
      }
    });

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'replace',
    });
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(
        switchMap((params) =>
          combineLatest([
            this.vehicleService.getVehicleFilterBrands(params),
            this.vehicleService.getVehicleFilterModels(params),
          ]).pipe(
            switchMap(([brandData, modelData]) => {
              this.brands = brandData.brands;
              this.models = modelData.models;

              Object.keys(this.brandFilter.controls).forEach((key) => {
                this.brandFilter.removeControl(key);
              });
              Object.keys(this.modelFilter.controls).forEach((key) => {
                this.modelFilter.removeControl(key);
              });

              this.brands.forEach((brand) => {
                this.brandFilter.addControl(brand.id, new FormControl(false));
              });

              this.models.forEach((model) => {
                this.modelFilter.addControl(model.id, new FormControl(false));
              });

              return [params];
            })
          )
        )
      )
      .subscribe({
        next: (params) => {
          this.vehicleForm.patchValue({
            category_id: params['category_id'] || '',
            price_min: params['price_min'] || '',
            price_max: params['price_max'] || '',
            mileage_min: params['mileage_min'] || '',
            mileage_max: params['mileage_max'] || '',
            colors: params['colors'] || '',
            date_first_registration_start: params['sdate_first_registration_start'] ? new Date(params['date_first_registration_start']) : '',
            date_first_registration_end: params['date_first_registration_end'] ? new Date(params['date_first_registration_end']) : '',
          });

          if (params['brand_ids']) {
            const brandIds = Array.isArray(params['brand_ids'])
              ? params['brand_ids']
              : [params['brand_ids']];
            brandIds.forEach((id) => {
              if (this.brandFilter.controls[id]) {
                this.brandFilter.controls[id].setValue(true);
              }
            });
          }

          if (params['model_ids']) {
            const modelIds = Array.isArray(params['model_ids'])
              ? params['model_ids']
              : [params['model_ids']];
            modelIds.forEach((id) => {
              if (this.modelFilter.controls[id]) {
                this.modelFilter.controls[id].setValue(true);
              }
            });
          }
        },
        error: (err) => {
          console.error('Error fetching vehicle filter data:', err);
        },
      });

    this.vehicleForm.valueChanges.pipe(debounceTime(100)).subscribe(() => {
      this.submitFilter();
    });
  }
}
