import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePopular } from './movie-popular';

describe('MoviePopular', () => {
  let component: MoviePopular;
  let fixture: ComponentFixture<MoviePopular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviePopular]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviePopular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
