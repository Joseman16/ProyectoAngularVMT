import { Component, inject, signal } from '@angular/core';
import { MovieCard } from '../../components/movie-card/movie-card';
import { CommonModule } from '@angular/common';
import { IMovie_top_rated } from '../../interfaces/IMovie_top-rated.interface';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-top-rated',
  imports: [MovieCard, CommonModule],
  templateUrl: './movie-top-rated.html',
  styleUrl: './movie-top-rated.scss'
})
export class MovieTopRated {
  private readonly _movieServices = inject(MovieService)
    
      public movies = signal<IMovie_top_rated[]>([])
    
      ngOnInit(): void {
        this._movieServices
        .getMovieTopRated()
        .subscribe({
          next: (res) => {
            this.movies.set(res.results);
          }
        })
    }
}
