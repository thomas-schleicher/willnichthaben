import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vehicle-description',
  imports: [],
  templateUrl: './vehicle-description.component.html',
  styleUrl: './vehicle-description.component.scss'
})
export class VehicleDescriptionComponent {
  @Input() name!: string;
  @Input() date_of_registration!: string;
  @Input() mileage!: number;
  @Input() fuel_type!: string;
  @Input() color!: string;
  @Input() condition!: string;
  @Input() model!: string;
  @Input() mark!: string;
  @Input() type!: string;

  ngOnChanges() {
    const date: Date = new Date(this.date_of_registration);
    this.date_of_registration = `${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
