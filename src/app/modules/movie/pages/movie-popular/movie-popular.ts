import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { URL_ROUTES } from '../../../shared/const/url-routes';
import { IMovieDetail } from '../../interfaces/IMovieDetail.interface';
import { environments } from '../../../../environments/environments';
import { IMoviePopular } from '../../interfaces/IMoviePopular.interface';
import { MovieCard } from '../../components/movie-card/movie-card';
import { CommonModule } from '@angular/common';
import { AnimatedMovieCard } from '../../components/animated-movie-card/animated-movie-card';

@Component({
  selector: 'app-movie-popular',
  imports: [AnimatedMovieCard, CommonModule],
  templateUrl: './movie-popular.html',
  styleUrl: './movie-popular.scss'
})
export class MoviePopular implements OnInit {
  private readonly _movieServices = inject(MovieService)
  
    public movies = signal<IMoviePopular[]>([])
  
    ngOnInit(): void {
      this._movieServices
      .getMoviePopular()
      .subscribe({
        next: (res) => {
          this.movies.set(res.results);
        }
      })
  }
}
