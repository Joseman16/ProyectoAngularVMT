import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTopRated } from './movie-top-rated';

describe('MovieTopRated', () => {
  let component: MovieTopRated;
  let fixture: ComponentFixture<MovieTopRated>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieTopRated]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieTopRated);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
