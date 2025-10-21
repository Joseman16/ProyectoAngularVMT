import { Component, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { MovieCard } from '../../../movie/components/movie-card/movie-card';

interface ResposiveOptions {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}
type CustomComponent = 'movie-card'
@Component({
  selector: 'app-custom-carousel',
  imports: [CarouselModule, MovieCard],
  templateUrl: './custom-carousel.html',
  styleUrl: './custom-carousel.scss',
})
export class CustomCarousel<T> {
  @Input({ required: true }) data: T[] = [];
  @Input({required: true}) customComponent!: CustomComponent
  @Input() responsiveOptions: ResposiveOptions[] | undefined;



  ngOnInit() {
    if (!this.responsiveOptions?.length) {
      this.responsiveOptions = [
        {
          breakpoint: '1400px',
          numVisible: 2,
          numScroll: 1,
        },
        {
          breakpoint: '1199px',
          numVisible: 3,
          numScroll: 1,
        },
        {
          breakpoint: '767px',
          numVisible: 2,
          numScroll: 1,
        },
        {
          breakpoint: '575px',
          numVisible: 1,
          numScroll: 1,
        },
      ];
    }
  }
}
