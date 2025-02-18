import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-retail-form',
  imports: [],
  templateUrl: './retail-form.component.html',
  styleUrl: './retail-form.component.scss'
})
export class RetailFormComponent {
  @Input() data: any = null;
  @Input() modifyMode: boolean = false;
}
