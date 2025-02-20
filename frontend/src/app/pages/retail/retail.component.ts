import { Component } from '@angular/core';
import { ListingPreviewComponent } from '../../components/listing-preview/listing-preview.component';
import { RetailItemFilterComponent } from '../../components/retail_item/retail_item-filter/retail_item-filter.component';
import { ActivatedRoute } from '@angular/router';
import { RetailService } from '../../service/retail.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-retail',
  standalone: true,
  imports: [ListingPreviewComponent, NgFor, RetailItemFilterComponent],
  templateUrl: './retail.component.html',
  styleUrls: ['./retail.component.scss']
})
export class RetailComponent {
  retail_items: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private retailService: RetailService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.retailService.getRetailItems(params).subscribe((data) => {
        this.retail_items = data.retail_items;
      });
    });
  }
}
