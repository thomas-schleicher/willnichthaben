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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VehicleService } from '../../../service/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, switchMap } from 'rxjs';

@Component({
  selector: 'app-vehicle-filter',
  imports: [
    ReactiveFormsModule,
    NgFor,
    MatExpansionModule,
    MatButtonToggleModule,
    MatCheckboxModule,
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

      // type_ids: this.fb.array([]),
      // date_first_registration_start: this.fb.control(''),
      // date_first_registration_end: this.fb.control(''),
      // mileage_min: this.fb.control(''),
      // mileage_max: this.fb.control(''),
      // fuel_types: this.fb.array([]),
      // colors: this.fb.array([]),
      // conditions: this.fb.array([]),
    });
  }

  submitFilter() {
    let params: { [param: string]: any } = {};
    let model_ids: number[] = [];
    let brand_ids: number[] = [];

    Object.keys(this.vehicleForm.controls).forEach((key) => {
      const control = this.vehicleForm.get(key);

      if (key === 'brandFilter') {
        brand_ids = Object.keys(control?.value).filter(key => control?.value[key]).flatMap((value) => Number(value));
        params['brand_ids'] = brand_ids;
      } else if (key === 'modelFilter') {
        brand_ids = Object.keys(control?.value).filter(key => control?.value[key]).flatMap((value) => Number(value));
        params['model_ids'] = model_ids;
      } else if (control?.value) {
        params[key] = control.value;
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
        ])
      )
    )
    .subscribe({
      next: ([brandData, modelData]) => {
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
      },
      error: (err) => {
        console.error('Error fetching vehicle filter data:', err);
      },
    });
  }
}
