import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-real-estate-subheader',
  imports: [],
  templateUrl: './real-estate-subheader.component.html',
  styleUrl: './real-estate-subheader.component.scss'
})
export class RealEstateSubheaderComponent {
  @Input() availability!: string;
  @Input() living_area!: string;
  @Input() property_type!: string;

  formattedAvailability: string = "";

  ngOnChanges() {
    const date: Date = new Date(this.availability);
    this.formattedAvailability = `${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
