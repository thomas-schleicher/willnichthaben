import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingPreviewComponent } from './listing-preview.component';

describe('ListingPreviewComponent', () => {
  let component: ListingPreviewComponent;
  let fixture: ComponentFixture<ListingPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
