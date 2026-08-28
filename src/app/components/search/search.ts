import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, debounceTime, filter } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class SearchComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  searchForm!: FormGroup;
  submitted: boolean = false;
  private valueChangesSub?: Subscription;

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(2)]]
    });

    this.valueChangesSub = this.searchForm.get('city')?.valueChanges
      .pipe(
        debounceTime(1500),
        filter(() => this.searchForm.valid)
      )
      .subscribe((value) => {
        this.navigateToCity(value);
      });
  }

  ngOnDestroy(): void {
    this.valueChangesSub?.unsubscribe();
  }

  get cityControl() {
    return this.searchForm.get('city');
  }

  onSubmit(): void {
    this.submitted = true;

    const trimmedCity = this.searchForm.value.city?.trim() ?? '';
    if (this.searchForm.invalid || !trimmedCity) {
      return;
    }

    this.navigateToCity(trimmedCity);
  }

  private navigateToCity(city: string): void {
    const trimmedCity = city.trim();
    if (trimmedCity) {
      this.router.navigate(['/weather', trimmedCity]);
    }
  }
}
