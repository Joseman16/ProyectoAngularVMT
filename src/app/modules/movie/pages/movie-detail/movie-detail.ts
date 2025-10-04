import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { URL_ROUTES } from '../../../shared/const/url-routes';
import { IMovieDetail } from '../../interfaces/IMovieDetail.interface';
import { environments } from '../../../../../environments/environments';

@Component({
  selector: 'app-movie-detail',
  imports: [],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss'
})
export class MovieDetail implements OnInit {

  private readonly _router = inject(ActivatedRoute);
  private readonly _route = inject(Router);
  private readonly _movieService = inject(MovieService);

  public movie = signal<IMovieDetail>({} as IMovieDetail)

  ngOnInit(){
    const idMovie = this._router.snapshot.paramMap.get('id')
    const onlyNumers: RegExp = /^[0-9]*$/
    if(!idMovie || !onlyNumers.test(idMovie)) {
      this._route.navigateByUrl(URL_ROUTES.MOVIE+'/error')
      return
    }
    this._movieService.getMovieDetail(Number(idMovie)).subscribe({
      next: (res) => {
        this.movie?.set(res)
      }
    })
  }

  get baseUrlImage() {
    return environments.baseUrlTMDB_Images
  }
}
