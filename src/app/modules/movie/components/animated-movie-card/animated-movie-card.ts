import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-animated-movie-card',
  standalone: true,
  imports: [CommonModule, DatePipe, DecimalPipe],
  templateUrl: './animated-movie-card.html',
  styleUrl: './animated-movie-card.scss'
})
export class AnimatedMovieCard {
  @Input() movie: any; // Usa tu interfaz si lo prefieres
}
