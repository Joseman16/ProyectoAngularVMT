import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieUpcoming } from './movie-upcoming';

describe('MovieUpcoming', () => {
  let component: MovieUpcoming;
  let fixture: ComponentFixture<MovieUpcoming>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieUpcoming]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieUpcoming);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
