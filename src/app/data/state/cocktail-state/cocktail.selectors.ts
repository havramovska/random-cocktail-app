import { CocktailsState } from './cocktail.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cocktailsAdapter } from './cocktail.reducer';

export const selectCocktailsState = createFeatureSelector<CocktailsState>('cocktails');

const { selectAll, selectEntities } = cocktailsAdapter.getSelectors();

export const selectAllCocktails = createSelector(
  selectCocktailsState,
  selectAll
);

export const selectCocktailEntities = createSelector(
  selectCocktailsState,
  selectEntities
);

export const selectSelectedCocktailId = createSelector(
  selectCocktailsState,
  (state) => state?.selectedCocktailId ?? null
);

export const selectSelectedCocktail = createSelector(
  selectCocktailEntities,
  selectSelectedCocktailId,
  (entities, selectedId) => selectedId && entities ? entities[selectedId] : null
);

export const selectCocktailsLoading = createSelector(
  selectCocktailsState,
  (state) => state?.loading ?? false
);

export const selectCocktailsError = createSelector(
  selectCocktailsState,
  (state) => state?.error ?? null
);

export const selectShownCocktailIds = createSelector(
  selectCocktailsState,
  (state) => state?.shownCocktailIds ?? []
);

export const selectSelectedLanguage = createSelector(
  selectCocktailsState,
  (state) => state?.selectedLanguage ?? 'EN'
); 