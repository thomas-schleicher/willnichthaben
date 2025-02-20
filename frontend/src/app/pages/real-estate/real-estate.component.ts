// real-estate.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RealEstateService } from '../../service/real-estate.service';
import { RealEstateFilterComponent } from '../../components/real-estate/real-estate-filter/real-estate-filter.component';
import { RealEstatePreviewComponent } from '../../components/real-estate-preview/real-estate-preview.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-real-estate',
  standalone: true,
  imports: [
    CommonModule,
    RealEstateFilterComponent,
    RealEstatePreviewComponent
  ],
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss']
})
export class RealEstateComponent implements OnInit {
  properties: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private realEstateService: RealEstateService
  ) {}

  ngOnInit() {
    this.loadListings();
    this.route.queryParams.subscribe(() => this.loadListings());
  }

  onFiltersApplied(filters: any) {
    console.log('Filters applied:', filters);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filters,
      queryParamsHandling: 'merge'
    });
  }

  private loadListings() {
    const params = this.route.snapshot.queryParams;
    console.log('Loading listings with params:', params);
    this.realEstateService.getRealEstateObjects(params)
      .subscribe({
        next: (data) => {
          console.log('Listings loaded:', data);
          const listings = Array.isArray(data) ? data : data.listings;
          this.properties = listings.map((listing: any) => ({
            id: listing.listing_id,
            name: listing.name || 'No name provided',
            property_type: listing.type || 'Unknown',
            location: listing.address
              ? `${listing.address.city} (${listing.address.postalCode})`
              : 'Unknown location',
            price: parseFloat(listing.price_per_month) || 0,
            imageURL: 'assets/default-property.jpg',
            living_area: parseFloat(listing.living_area) || 0,
            room_count: listing.room_count || 0,
            availability: listing.availability || 'Unknown'
          }));
        },
        error: (error) => console.error('Error loading listings:', error)
      });
  }
}
