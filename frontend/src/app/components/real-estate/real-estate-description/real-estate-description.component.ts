import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-real-estate-description',
  imports: [],
  templateUrl: './real-estate-description.component.html',
  styleUrl: './real-estate-description.component.scss'
})
export class RealEstateDescriptionComponent {
  @Input() living_area!: string;
  @Input() room_count!: number;
  @Input() availability!: string;
  @Input() kitchen!: boolean;
  @Input() cellar!: boolean;
  @Input() address!: string;
  @Input() property_type!: string;
  @Input() renting_period!: string;
  @Input() balcony!: boolean;
  @Input() parking!: boolean;

  ngOnChanges() {
    const date: Date = new Date(this.availability);
    this.availability = `${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
