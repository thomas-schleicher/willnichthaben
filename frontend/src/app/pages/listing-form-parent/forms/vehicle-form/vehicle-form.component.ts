import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-vehicle-form',
  imports: [],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.scss'
})
export class VehicleFormComponent {
  @Input() data: any = null;
  @Input() modifyMode: boolean = false;
}
