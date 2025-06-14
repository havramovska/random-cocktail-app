import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CocktailActions } from '../../data/state/cocktail-state/cocktail.actions';
import { selectCocktailsError, selectCocktailsLoading, selectSelectedCocktail } from '../../data/state/cocktail-state/cocktail.selectors';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Cocktail } from '@app/domain/models/cocktail.model';
import { CocktailCardComponent } from '../shared/components/cocktail-card/cocktail-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CocktailCardComponent,
    MatProgressSpinnerModule,
    AsyncPipe,
    NgIf
  ]
})
export class HomeComponent implements OnInit {
  selectedCocktail$: Observable<Cocktail | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.selectedCocktail$ = this.store.select(selectSelectedCocktail).pipe(
      map(cocktail => cocktail ?? null)
    );
    this.loading$ = this.store.select(selectCocktailsLoading);
    this.error$ = this.store.select(selectCocktailsError).pipe(
      tap(error => console.log('Error:', error))
    );
  }

  ngOnInit(): void {
    this.loadRandomCocktail();
  }

  onRefreshClick(): void {
    this.loadRandomCocktail();
  }

  private loadRandomCocktail(): void {
    this.store.dispatch(CocktailActions.loadRandomCocktail());
  }
} 