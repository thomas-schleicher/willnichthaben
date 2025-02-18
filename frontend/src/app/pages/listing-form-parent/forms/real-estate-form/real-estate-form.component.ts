import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-real-estate-form',
  templateUrl: './real-estate-form.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./real-estate-form.component.scss']
})
export class RealEstateFormComponent implements OnInit {
  // Inputs to accept data and mode from the parent component.
  @Input() data: any = null;
  @Input() modifyMode: boolean = false;

  realEstateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.realEstateForm = this.fb.group({});
  }

  ngOnInit(): void {
    // Build the form with initial fields and their validators.
    this.realEstateForm = this.fb.group({
      propertyName: ['', Validators.required],
      address: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]]
    });

    // If modify mode and data is provided, prefill using the passed data.
    if (this.modifyMode && this.data) {
      this.realEstateForm.patchValue({
        propertyName: this.data.propertyName,
        address: this.data.address,
        price: this.data.price
      });
    } else {
      // Otherwise, use the simulated prefill logic.
      this.prefillForm();
    }
  }

  // Simulated prefill logic—replace this with your actual fetching logic if needed.
  prefillForm(): void {
    const fetchedData = {
      propertyName: 'Sunny Apartment',
      address: '123 Main St, Springfield',
      price: '250000'
    };

    this.realEstateForm.patchValue(fetchedData);
  }

  // Handle form submission.
  onSubmit(): void {
    if (this.realEstateForm.valid) {
      console.log('Real Estate Form Submitted:', this.realEstateForm.value);
      // TODO: Implement your backend submission logic here.
    }
  }
}
