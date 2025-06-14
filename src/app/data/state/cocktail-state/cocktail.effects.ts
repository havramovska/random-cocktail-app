import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { CocktailActions } from './cocktail.actions';
import { GetRandomCocktailUseCase } from '../../../domain/use-cases/get-random-cocktail.use-case';
import { SaveCocktailUseCase } from '../../../domain/use-cases/save-cocktail.use-case';

@Injectable()
export class CocktailEffects {
  loadRandomCocktail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CocktailActions.loadRandomCocktail),
      mergeMap(() =>
        this.getRandomCocktailUseCase.execute().pipe(
          tap(cocktail => this.saveCocktailUseCase.execute(cocktail)),
          map(cocktail => CocktailActions.loadRandomCocktailSuccess({ cocktail })),
          catchError(error => of(CocktailActions.loadRandomCocktailFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private getRandomCocktailUseCase: GetRandomCocktailUseCase,
    private saveCocktailUseCase: SaveCocktailUseCase
  ) {}
} 