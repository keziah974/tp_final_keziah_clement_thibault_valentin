import { DecimalPipe } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges
} from '@angular/core';

import { WeatherService } from '../../core/weather.service';

@Component({
  selector: 'app-weather',
  imports: [DecimalPipe],
  templateUrl: './weather.html',
  styleUrl: './weather.css'
})
export class Weather implements OnChanges {
  @Input({ required: true }) city = '';

  protected readonly weatherService = inject(WeatherService);

  ngOnChanges(): void {
    const city = this.city.trim();

    if (city !== '') {
      this.weatherService.searchCity(city);
    }
  }

  protected getIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
}