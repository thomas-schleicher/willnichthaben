import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailItemFilterComponent } from './retail_item-filter.component';

describe('RetailItemFilterComponent', () => {
  let component: RetailItemFilterComponent;
  let fixture: ComponentFixture<RetailItemFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetailItemFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailItemFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
