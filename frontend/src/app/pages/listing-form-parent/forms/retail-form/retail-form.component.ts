import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { RetailService } from '../../../../service/retail.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-retail-form',
  imports: [
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './retail-form.component.html',
  styleUrl: './retail-form.component.scss'
})
export class RetailFormComponent {
  @Input() data: any = null;
  @Input() modifyMode: boolean = false;

  retailItemForm: FormGroup;

  constructor(private fb: FormBuilder, private retailService: RetailService) {
    this.retailItemForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.retailItemForm = this.fb.group({
      title: this.fb.control(''),
      description: this.fb.control(''),
      price: this.fb.control(''),
      category_id: this.fb.control(''),
      name: this.fb.control(''),
      delivery_options: this.fb.control(''),
      condition: this.fb.control('')
    });

    if (this.modifyMode && this.data) {
      this.retailItemForm.patchValue({
        title: this.data.title,
        description: this.data.description,
        price: this.data.price,
        category_id: this.data.retail_item_category_id,
        name: this.data.retail_name,
        delivery_options: this.data.retail_item_delivery_options,
        condition: this.data.retail_item_condition,
      });
    }
  }

  onSubmit(): void {
    if (this.retailItemForm.valid) {
      console.log(this.retailItemForm.value);

      const {
        title,
        description,
        price,
        name,
        category_id,
        delivery_options,
        condition
      } = this.retailItemForm.value;

      if (this.modifyMode) {
        this.retailService.updateRetailItemListing(this.data.id, this.data.type, title, description, price, name, category_id, delivery_options, condition).subscribe();
      } else {
        this.retailService.createRetailListing('retail', title, description, price, name, category_id, delivery_options, condition).subscribe();
      }
    }
  }
}
