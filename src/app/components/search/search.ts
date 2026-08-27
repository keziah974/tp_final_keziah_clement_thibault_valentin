import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, filter } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Formulaire réactif avec champ obligatoire (au moins 2 caractères)
    this.searchForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(2)]]
    });

    // Anti-spam / Debounce : écoute les changements avec 500 ms de délai
    this.searchForm.get('city')?.valueChanges.pipe(
      debounceTime(2000),
      filter(() => this.searchForm.valid)
    ).subscribe(value => {
      this.navigateToCity(value);
    });
  }

  // Raccourci pour accéder aux contrôles dans le template
  get f() {
    return this.searchForm.controls;
  }

  // Soumission au clic sur "Rechercher"
  onSubmit(): void {
    this.submitted = true;

    if (this.searchForm.invalid) {
      return;
    }

    this.navigateToCity(this.searchForm.value.city);
  }

  private navigateToCity(city: string): void {
    const trimmedCity = city.trim();
    if (trimmedCity) {
      this.router.navigate(['/weather', trimmedCity]);
    }
  }
}