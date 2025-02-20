import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailItemSubheaderComponent } from './retail_item-subheader.component';

describe('RetailItemSubheaderComponent', () => {
  let component: RetailItemSubheaderComponent;
  let fixture: ComponentFixture<RetailItemSubheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetailItemSubheaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailItemSubheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
