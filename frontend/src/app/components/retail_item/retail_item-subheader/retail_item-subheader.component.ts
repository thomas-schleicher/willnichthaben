import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-retail-item-subheader',
  imports: [],
  templateUrl: './retail_item-subheader.component.html',
  styleUrls: ['./retail_item-subheader.component.scss']
})
export class RetailItemSubheaderComponent {
  @Input() name!: string;
  @Input() delivery_options!: string;
  @Input() condition!: string;

  ngOnInit() {
    console.log("📢 Subheader Inputs:", this.name, this.condition, this.delivery_options);
}
}

