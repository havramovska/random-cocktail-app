import { createReducer, on } from '@ngrx/store';
import { CocktailActions } from './cocktail.actions';
import { CocktailsState } from './cocktail.model';
import { createEntityAdapter } from '@ngrx/entity';
import { Cocktail } from '../../../domain/models/cocktail.model';

export const cocktailsAdapter = createEntityAdapter<Cocktail>();

export const initialState: CocktailsState = cocktailsAdapter.getInitialState({
  selectedCocktailId: null,
  loading: false,
  error: null,
  shownCocktailIds: [],
  selectedLanguage: 'EN'
});

export const cocktailsReducer = createReducer(
  initialState,
  on(CocktailActions.loadRandomCocktail, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CocktailActions.loadRandomCocktailSuccess, (state, { cocktail }) => {
    return cocktailsAdapter.addOne(cocktail, {
      ...state,
      loading: false,
      selectedCocktailId: cocktail.id,
      shownCocktailIds: [...state.shownCocktailIds, cocktail.id]
    });
  }),
  on(CocktailActions.loadRandomCocktailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(CocktailActions.selectCocktail, (state, { cocktailId }) => ({
    ...state,
    selectedCocktailId: cocktailId
  })),
  on(CocktailActions.clearSelectedCocktail, (state) => ({
    ...state,
    selectedCocktailId: null
  })),
  on(CocktailActions.selectLanguage, (state, { language }) => ({
    ...state,
    selectedLanguage: language
  }))
); 