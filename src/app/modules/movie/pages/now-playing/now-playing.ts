import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { IMovieNowPlaying } from '../../interfaces/INowPlaying.interface';
import { MovieCard } from '../../components/movie-card/movie-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-now-playing',
  imports: [MovieCard, CommonModule],
  templateUrl: './now-playing.html',
  styleUrl: './now-playing.scss'
})
export class NowPlaying implements OnInit {

  private readonly _movieServices = inject(MovieService)

  public movies = signal<IMovieNowPlaying[]>([])

  ngOnInit(): void {
    this._movieServices
    .getMoviesNowPlaying()
    .subscribe({
      next: (res) => {
        this.movies.set(res.results);
      }
    })
  }
}
