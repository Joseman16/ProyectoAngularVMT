import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCarousel } from './custom-carousel';

describe('CustomCarousel', () => {
  let component: CustomCarousel;
  let fixture: ComponentFixture<CustomCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
