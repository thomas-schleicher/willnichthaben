import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageReelComponent } from './image-reel.component';

describe('ImageReelComponent', () => {
  let component: ImageReelComponent;
  let fixture: ComponentFixture<ImageReelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageReelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
