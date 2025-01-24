import { Component, Input } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-listing',
  imports: [SidebarComponent],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent {
  title: string = "Test Title";
  subtitle: string = "Stats und So";
  seller_name: string = "Thomas Schleicher";
  address: string = "Aicher Straße 71"
  price: number = 202;
  description: string = "Test Description";
}
