import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CurrentWeather,ForecastResponse} from '../models/weather.model';

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
        units: 'metric'
      }
    });
  }

  getForecast(city: string): Observable<ForecastResponse> {
    const url = `${environment.openWeatherBaseUrl}/forecast`;
    return this.http.get<ForecastResponse>(url, {
      params: {
        q: city,
        appid: environment.openWeatherApiKey,
        units: 'metric'
      }
    });
  }

  searchCity(city: string): void {
    if (city === this.currentCity() && this.weatherData() !== null) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.getCurrentWeather(city).subscribe({
      next: (data) => {
        this.weatherData.set(data);
        this.currentCity.set(city);
        this.isLoading.set(false);
      },
      error: (erreur) => {
        if (erreur.status === 404) {
          this.errorMessage.set('Ville introuvable.');
        } else if (erreur.status === 429) {
          this.errorMessage.set('Trop de requêtes, veuillez réessayer dans quelques instants.');
        } else {
          this.errorMessage.set('Impossible de récupérer les données météo.');
        }
        this.isLoading.set(false);
      }
    });
  }
}
