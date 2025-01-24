import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vehicle-subheader',
  imports: [],
  templateUrl: './vehicle-subheader.component.html',
  styleUrl: './vehicle-subheader.component.scss'
})
export class VehicleSubheaderComponent {
  @Input() date_first_registration!: string;
  @Input() mileage!: number;
  @Input() condition!: string;

  first_registration: string = "";
  ngOnChanges() {
      const date: Date = new Date(this.date_first_registration);
      this.first_registration = `${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
