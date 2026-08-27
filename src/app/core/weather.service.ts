import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly http = inject(HttpClient);

  getCurrentWeather(city: string): Observable<any> {
    const url = `${environment.openWeatherBaseUrl}/weather`;
    return this.http.get(url, {
      params: {
        q: city,
        appid: environment.openWeatherApiKey,
        units: 'metric'
      }
    });
  }
}
