import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnDestroy, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../../core/weather.service';
import { ForecastItem } from '../../models/weather.model';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './forecast.html',
  styleUrl: './forecast.css'
})
export class Forecast implements OnChanges, OnDestroy {
  @Input({ required: true }) city: string = '';

  private readonly weatherService = inject(WeatherService);

  protected readonly forecasts = signal<ForecastItem[]>([]);
  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  private forecastSubscription?: Subscription;

  ngOnChanges(): void {
    const city = this.city.trim();
    if (city === '') {
      return;
    }
    this.loadForecast(city);
  }

  ngOnDestroy(): void {
    this.forecastSubscription?.unsubscribe();
  }

  protected getIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  protected formatDay(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'short',
      day: 'numeric'
    }).format(date);
  }

  private loadForecast(cityName: string): void {
    this.forecastSubscription?.unsubscribe();
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.forecasts.set([]);

    this.forecastSubscription = this.weatherService.getForecast(cityName).subscribe({
      next: (response) => {
        const dailyForecasts = response.list
          .filter((item) => item.dt_txt.includes('12:00:00'))
          .slice(0, 5);

        this.forecasts.set(dailyForecasts);
        this.isLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.errorMessage.set('Prévisions introuvables pour cette ville.');
        } else if (error.status === 429) {
          this.errorMessage.set('Trop de requêtes, veuillez réessayer dans quelques instants.');
        } else {
          this.errorMessage.set('Impossible de récupérer les prévisions météo.');
        }
        this.isLoading.set(false);
      }
    });
  }
}


