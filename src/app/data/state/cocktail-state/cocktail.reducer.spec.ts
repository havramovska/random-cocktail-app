import { cocktailsReducer } from './cocktail.reducer';
import { CocktailsState } from './cocktail.model';
import { CocktailActions } from './cocktail.actions';
import { Cocktail } from '@app/domain/models/cocktail.model';

describe('CocktailsReducer', () => {
  const initialState: CocktailsState = {
    ids: [],
    entities: {},
    selectedCocktailId: null,
    loading: false,
    error: null,
    shownCocktailIds: [],
    selectedLanguage: 'EN'
  };

  const mockCocktail: Cocktail = {
    id: '12345',
    title: 'Test Cocktail',
    category: 'Test Category',
    alcoholic: 'Alcoholic',
    glass: 'Test Glass',
    imageUrl: 'http://test.com/image.jpg',
    instructions: {
      EN: 'Test instructions',
      ES: '',
      DE: '',
      FR: '',
      IT: ''
    },
    ingredients: [
      { ingredient: 'Ingredient 1', measure: '1 oz' }
    ]
  };

  it('should return initial state', () => {
    const action = { type: 'UNKNOWN' };
    const state = cocktailsReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle loadRandomCocktail', () => {
    const action = CocktailActions.loadRandomCocktail();
    const state = cocktailsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle loadRandomCocktailSuccess', () => {
    const action = CocktailActions.loadRandomCocktailSuccess({ cocktail: mockCocktail });
    const state = cocktailsReducer(initialState, action);
    expect(state.entities[mockCocktail.id]).toEqual(mockCocktail);
    expect(state.ids).toContain(mockCocktail.id);
    expect(state.selectedCocktailId).toBe(mockCocktail.id);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle loadRandomCocktailFailure', () => {
    const error = 'Test error';
    const action = CocktailActions.loadRandomCocktailFailure({ error });
    const state = cocktailsReducer(initialState, action);
    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });

  it('should handle selectLanguage', () => {
    const language = 'EN';
    const action = CocktailActions.selectLanguage({ language });
    const state = cocktailsReducer(initialState, action);
    expect(state.selectedLanguage).toBe(language);
  });

  it('should preserve state for unknown actions', () => {
    const action = { type: 'UNKNOWN' };
    const state = cocktailsReducer(initialState, action);
    expect(state).toBe(initialState);
  });
}); 