import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSubheaderComponent } from './vehicle-subheader.component';

describe('VehicleSubheaderComponent', () => {
  let component: VehicleSubheaderComponent;
  let fixture: ComponentFixture<VehicleSubheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleSubheaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleSubheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
