import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { INowPlaying } from '../interfaces/INowPlaying.interface';
import { Observable } from 'rxjs';
import { IMovieDetail } from '../interfaces/IMovieDetail.interface';
import { IMoviePopular} from '../interfaces/IMoviePopular.interface';
import { IMovie_top_rated } from '../interfaces/IMovie_top-rated.interface';
import { IMovieUpcoming } from '../interfaces/IMovieUpcoming.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly _http = inject(HttpClient);
  private readonly _baseUrl: string = environments.baseUrlTMDB

  getMoviesNowPlaying(): Observable<INowPlaying>{
    const url: string = `${this._baseUrl}/3/movie/now_playing`
    return this._http.get<INowPlaying>(url)
  }

  getMovieDetail(id: number): Observable<IMovieDetail>{
    const url: string = `${this._baseUrl}/3/movie/${id}`
    return this._http.get<IMovieDetail>(url)
  }

   getMoviePopular(): Observable<IMoviePopular>{
    const url: string = `${this._baseUrl}/3/movie/popular`
    return this._http.get<IMoviePopular>(url)
  }

  getMovieTopRated(): Observable<IMovie_top_rated>{
    const url: string = `${this._baseUrl}/3/movie/top_rated`
    return this._http.get<IMovie_top_rated>(url)
  }

  getMovieUpcoming(): Observable<IMovieUpcoming>{
    const url: string = `${this._baseUrl}/3/movie/upcoming`
    return this._http.get<IMovieUpcoming>(url)
  }
}
