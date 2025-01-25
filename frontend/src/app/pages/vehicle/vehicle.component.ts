import { Component } from '@angular/core';
import { ListingPreviewComponent } from '../../components/listing-preview/listing-preview.component';

@Component({
  selector: 'app-vehicle',
  imports: [ListingPreviewComponent],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss'
})
export class VehicleComponent {

}
