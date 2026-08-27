import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {
  private route = inject(ActivatedRoute);

  @Input() city: string = '';

  ngOnInit(): void {
    if (!this.city) {
      this.city = this.route.snapshot.paramMap.get('city') || '';
    }
  }
}
