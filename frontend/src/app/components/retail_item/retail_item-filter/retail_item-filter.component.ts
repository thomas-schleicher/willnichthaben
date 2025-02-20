import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, debounceTime, switchMap } from 'rxjs';

@Component({
    selector: 'app-retail-item-filter',
    imports: [
        ReactiveFormsModule,
        MatExpansionModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        CommonModule,
    ],
    templateUrl: './retail_item-filter.component.html',
    styleUrls: ['./retail_item-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetailItemFilterComponent {

    retailItemForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.retailItemForm = this.fb.group({
            category_id: this.fb.control(1),
            price_min: this.fb.control(''),
            price_max: this.fb.control(''),
            conditions: this.fb.control([]),
            delivery_options: this.fb.control('')
        });
    }

    submitFilter() {
        console.log("🟠 submitFilter() wurde aufgerufen!");
        let params: { [param: string]: any } = {};

        Object.keys(this.retailItemForm.controls).forEach((key) => {
            const control = this.retailItemForm.get(key);

            console.log(`Key: ${key}, Value:`, control?.value);

            if (control?.value) {
                params[key] = control.value;
            }
        });

        console.log("Query params: ", params);

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: params,
            queryParamsHandling: 'replace',
        });
    }

    ngOnInit() {
        this.route.queryParams
            .pipe()
            .subscribe({
                next: (params) => {
                    this.retailItemForm.patchValue({
                        category_id: params['category_id'] ? Number(params['category_id']) : this.retailItemForm.value.category_id,
                        price_min: params['price_min'] || '',
                        price_max: params['price_max'] || ''
                    });
                },
                error: (err) => {
                    console.error('Error fetching retail item filter data:', err);
                },
            });

        this.retailItemForm.valueChanges.pipe(debounceTime(100)).subscribe(() => {
            this.submitFilter();
        });

        this.submitFilter();
    }
}