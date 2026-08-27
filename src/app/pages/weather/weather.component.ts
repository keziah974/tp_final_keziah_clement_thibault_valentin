import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { Forecast } from '../../components/forecast/forecast';
import { Weather } from '../../components/weather/weather';

@Component({
  selector: 'app-weather-page',
  standalone: true,
  imports: [RouterLink, Weather, Forecast],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private routeSubscription?: Subscription;

  city = '';

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      this.city = params.get('city')?.trim() ?? '';
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}