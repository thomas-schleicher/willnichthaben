import { Component } from '@angular/core';
import { ListingPreviewComponent } from '../../components/listing-preview/listing-preview.component';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../service/vehicle.service';
import { NgFor } from '@angular/common';
import { VehicleFilterComponent } from '../../components/vehicle/vehicle-filter/vehicle-filter.component';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [ListingPreviewComponent, NgFor, VehicleFilterComponent],
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent {
  vehicles: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      
      // this.filterForm.patchValue(params);
      this.vehicleService.getVehicles(params).subscribe((data) => {
        this.vehicles = data.vehicles;
      });
    });

    // this.filterForm.valueChanges.subscribe((value) => {
    //   const queryParams = { ...value };
    //   this.router.navigate([], { queryParams });
    // });
  }
}
