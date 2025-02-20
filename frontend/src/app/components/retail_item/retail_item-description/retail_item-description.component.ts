import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-retail-item-description',
    imports: [],
    templateUrl: 'retail_item-description.component.html',
    styleUrl: 'retail_item-description.component.scss'
})
export class RetailItemDescriptionComponent {
    @Input() name!: string;
    @Input() condition!: string;
    @Input() delivery_options!: string;
}