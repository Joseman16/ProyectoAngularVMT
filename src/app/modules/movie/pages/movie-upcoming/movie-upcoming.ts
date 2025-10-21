import { Component, inject, signal } from '@angular/core';
import { IMovieUpcoming } from '../../interfaces/IMovieUpcoming.interface';
import { MovieService } from '../../services/movie.service';
import { MovieCard } from '../../components/movie-card/movie-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-upcoming',
  imports: [MovieCard, CommonModule],
  templateUrl: './movie-upcoming.html',
  styleUrl: './movie-upcoming.scss'
})
export class MovieUpcoming {
  private readonly _movieServices = inject(MovieService)

  public movies = signal<IMovieUpcoming[]>([])

  ngOnInit(): void {
    this._movieServices
    .getMovieUpcoming()
    .subscribe({
      next: (res) => {
        this.movies.set(res.results);
      }
    })
  }
}
