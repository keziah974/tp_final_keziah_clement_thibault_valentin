import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { WeatherService } from '../../core/weather.service';

@Component({
  selector: 'app-weather',
  imports: [DecimalPipe],
  templateUrl: './weather.html',
  styleUrl: './weather.css'
})
export class Weather {
  protected readonly weatherService = inject(WeatherService);

  protected getIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
}
