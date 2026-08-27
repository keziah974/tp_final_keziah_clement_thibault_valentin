import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentWeather, ForecastResponse } from '../models/weather.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly http = inject(HttpClient);

  readonly currentCity = signal<string | null>(null);
  readonly weatherData = signal<CurrentWeather | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  getCurrentWeather(city: string): Observable<CurrentWeather> {
    const url = `${environment.openWeatherBaseUrl}/weather`;
    return this.http.get<CurrentWeather>(url, {
      params: {
        q: city,
        appid: environment.openWeatherApiKey,
        units: 'metric',
        lang: 'fr'
      }
    });
  }

  getForecast(city: string): Observable<ForecastResponse> {
    const url = `${environment.openWeatherBaseUrl}/forecast`;
    return this.http.get<ForecastResponse>(url, {
      params: {
        q: city,
        appid: environment.openWeatherApiKey,
        units: 'metric',
        lang: 'fr'
      }
    });
  }

  searchCity(city: string): void {
    const trimmedCity = city.trim();
    if (!trimmedCity) return;

    if (trimmedCity === this.currentCity() && this.weatherData() !== null) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.getCurrentWeather(trimmedCity).subscribe({
      next: (data) => {
        this.weatherData.set(data);
        this.currentCity.set(trimmedCity);
        this.isLoading.set(false);
      },
      error: (error) => {
        if (error.status === 404) {
          this.errorMessage.set('Ville introuvable.');
        } else if (error.status === 429) {
          this.errorMessage.set('Trop de requêtes, veuillez réessayer dans quelques instants.');
        } else {
          this.errorMessage.set('Impossible de récupérer les données météo.');
        }
        this.weatherData.set(null);
        this.isLoading.set(false);
      }
    });
  }
}

