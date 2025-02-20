// real-estate-filter.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RealEstateService } from '../../../service/real-estate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-real-estate-filter',
  templateUrl: './real-estate-filter.component.html',
  styleUrls: ['./real-estate-filter.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class RealEstateFilterComponent implements OnInit {
  filterForm: FormGroup;
  provinces: any[] = [];
  cities: any[] = [];
  filteredCities: any[] = [];
  @Output() filtersApplied = new EventEmitter<any>();
  isLoading = false;

  // Define which fields should be shown for each category
  private readonly houseSpecificFields = [
    'land_plot_size_min',
    'land_plot_size_max',
    'num_floors'
  ];

  private readonly apartmentSpecificFields = [
    'balcony',
    'balcony_size_min',
    'balcony_size_max'
  ];

  constructor(
    private fb: FormBuilder,
    private realEstateService: RealEstateService,
    private router: Router
  ) {
    this.filterForm = this.fb.group({
      topLevelCategory: ['houses'],
      type_ids: [[]],
      province_id: [null],
      city_ids: [[]],
      price_min: [null],
      price_max: [null],
      renting_period: [''],
      immediate_availability: [false],
      living_area_min: [null],
      living_area_max: [null],
      room_count_min: [null],
      room_count_max: [null],
      // Additional properties
      balcony: [false],
      balcony_size_min: [null],
      balcony_size_max: [null],
      garden: [false],
      parking: [false],
      storage_room: [false],
      land_plot_size_min: [null],
      land_plot_size_max: [null],
      num_floors: [null],
      kitchen: [false],
      cellar: [false],
      postal_code: ['']
    });
  }

  ngOnInit(): void {
    console.log('Component initializing...');

    // Load initial data
    this.loadProvinces();
    this.loadCities();

    // Watch for province changes to filter cities
    this.filterForm.get('province_id')?.valueChanges.subscribe(provinceId => {
      console.log('Province changed:', provinceId);
      console.log('All available cities:', this.cities);

      if (provinceId) {
        this.filteredCities = this.cities.filter(city => {
          const cityProvinceId = Number(city.province_id || city.provinceId);
          const selectedProvinceId = Number(provinceId);
          return cityProvinceId === selectedProvinceId;
        });
        console.log('Filtered cities for province:', this.filteredCities);
      } else {
        this.filteredCities = [];
        this.filterForm.get('city_ids')?.patchValue([]);
      }
    });

    // Watch changes in city selection
    this.filterForm.get('city_ids')?.valueChanges.subscribe(selectedCities => {
      console.log('Selected cities changed:', selectedCities);
    });

    // Watch for topLevelCategory changes to handle field visibility
    this.filterForm.get('topLevelCategory')?.valueChanges.subscribe(category => {
      this.handleCategoryChange(category);
    });

    // Auto-submit when certain filters change
    const autoSubmitControls = ['topLevelCategory', 'immediate_availability'];
    autoSubmitControls.forEach(control => {
      this.filterForm.get(control)?.valueChanges.subscribe(() => {
        this.applyFilters();
      });
    });
  }

  private handleCategoryChange(category: string): void {
    // Reset category-specific fields when changing categories
    if (category === 'houses') {
      this.apartmentSpecificFields.forEach(field => {
        this.filterForm.get(field)?.reset();
      });
    } else {
      this.houseSpecificFields.forEach(field => {
        this.filterForm.get(field)?.reset();
      });
    }
  }

  // Method to check if a field should be shown based on current category
  shouldShowField(fieldName: string): boolean {
    const currentCategory = this.filterForm.get('topLevelCategory')?.value;

    if (currentCategory === 'houses') {
      return !this.apartmentSpecificFields.includes(fieldName);
    } else {
      return !this.houseSpecificFields.includes(fieldName);
    }
  }

  private loadProvinces(): Promise<void> {
    this.isLoading = true;
    return new Promise((resolve) => {
      this.realEstateService.getAllProvinces().subscribe({
        next: (response) => {
          if (!response || !response.provinces) {
            console.error('Invalid response format:', response);
            return;
          }
          this.provinces = response.provinces;
          this.isLoading = false;
          resolve();
        },
        error: (error) => {
          console.error('Error loading provinces', error);
          this.isLoading = false;
          resolve();
        }
      });
    });
  }

  private loadCities(): void {
    console.log('Loading cities...');
    this.isLoading = true;

    this.realEstateService.getAllCities().subscribe({
      next: (response) => {
        console.log('Cities response:', response);
        if (response && response.cities) {
          this.cities = response.cities;
          console.log('Cities loaded:', this.cities);

          // If there's an initial province selected, filter cities
          const currentProvinceId = this.filterForm.get('province_id')?.value;
          if (currentProvinceId) {
            this.filteredCities = this.cities.filter(city => city.province_id === currentProvinceId);
            console.log('Initial filtered cities:', this.filteredCities);
          }
        } else {
          console.error('Invalid cities response format:', response);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading cities:', error);
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    const formValue = this.cleanFormValue(this.filterForm.value);
    this.filtersApplied.emit(formValue);
  }

  private cleanFormValue(formValue: any): any {
    console.log('Cleaning form value:', formValue);
    const cleaned: any = {};

    Object.keys(formValue).forEach(key => {
      const value = formValue[key];
      console.log(`Processing field ${key}:`, value);

      // Only include fields that should be shown for current category
      if (!this.shouldShowField(key)) {
        console.log(`Skipping ${key} - not shown for current category`);
        return;
      }

      // Special handling for arrays (like city_ids)
      if (Array.isArray(value)) {
        if (value.length > 0) {
          cleaned[key] = value;
          console.log(`Added array ${key}:`, value);
        }
        return;
      }

      // Special handling for boolean values
      if (typeof value === 'boolean') {
        if (value === true) {
          cleaned[key] = value;
          console.log(`Added boolean ${key}:`, value);
        }
        return;
      }

      // For non-boolean values, include if they have a value
      if (value !== null && value !== '') {
        cleaned[key] = value;
        console.log(`Added value ${key}:`, value);
      }
    });

    console.log('Cleaned form value:', cleaned);
    return cleaned;
  }

  resetFilters(): void {
    // Reset form to initial values
    this.filterForm.reset({
      topLevelCategory: 'houses',
      type_ids: [],
      province_id: null,
      city_ids: [],
      price_min: null,
      price_max: null,
      renting_period: '',
      immediate_availability: false,
      living_area_min: null,
      living_area_max: null,
      room_count_min: null,
      room_count_max: null,
      balcony: false,
      balcony_size_min: null,
      balcony_size_max: null,
      garden: false,
      parking: false,
      storage_room: false,
      land_plot_size_min: null,
      land_plot_size_max: null,
      num_floors: null,
      kitchen: false,
      cellar: false,
      postal_code: ''
    });

    // Reset cities
    this.filteredCities = [];

    // Force page reload
    window.location.href = window.location.pathname;
  }
}
