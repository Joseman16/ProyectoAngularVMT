import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedMovieCard } from './animated-movie-card';

describe('AnimatedMovieCard', () => {
  let component: AnimatedMovieCard;
  let fixture: ComponentFixture<AnimatedMovieCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedMovieCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedMovieCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
