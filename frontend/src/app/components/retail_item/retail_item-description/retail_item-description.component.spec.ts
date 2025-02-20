import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailItemDescriptionComponent } from './retail_item-description.component';

describe('RetailItemDescriptionComponent', () => {
    let component: RetailItemDescriptionComponent;
    let fixture: ComponentFixture<RetailItemDescriptionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RetailItemDescriptionComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(RetailItemDescriptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});