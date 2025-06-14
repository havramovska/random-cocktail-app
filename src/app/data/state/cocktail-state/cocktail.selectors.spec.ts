import { selectCocktailsError, selectCocktailsLoading, selectSelectedCocktail, selectSelectedLanguage } from './cocktail.selectors';
import { CocktailsState } from './cocktail.model';
import { Cocktail } from '@app/domain/models/cocktail.model';
import { createFeatureSelector } from '@ngrx/store';

describe('Cocktail Selectors', () => {
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

  const mockState: CocktailsState = {
    ids: [mockCocktail.id],
    entities: {
      [mockCocktail.id]: mockCocktail
    },
    selectedCocktailId: mockCocktail.id,
    loading: true,
    error: 'Test error',
    shownCocktailIds: [mockCocktail.id],
    selectedLanguage: 'EN'
  };

  const mockRootState = {
    cocktails: mockState
  };

  it('should select loading state', () => {
    const result = selectCocktailsLoading(mockRootState);
    expect(result).toBe(true);
  });

  it('should select error state', () => {
    const result = selectCocktailsError(mockRootState);
    expect(result).toBe('Test error');
  });

  it('should select selected cocktail', () => {
    const result = selectSelectedCocktail(mockRootState);
    expect(result).toEqual(mockCocktail);
  });

  it('should select selected language', () => {
    const result = selectSelectedLanguage(mockRootState);
    expect(result).toBe('EN');
  });

  it('should return null for selected cocktail when no cocktail is selected', () => {
    const stateWithoutSelectedCocktail = {
      cocktails: {
        ids: [],
        entities: {},
        selectedCocktailId: null,
        loading: false,
        error: null,
        shownCocktailIds: [],
        selectedLanguage: 'EN'
      }
    };
    const result = selectSelectedCocktail(stateWithoutSelectedCocktail);
    expect(result).toBeNull();
  });

  it('should return null for error when no error exists', () => {
    const stateWithoutError = {
      cocktails: {
        ids: [mockCocktail.id],
        entities: {
          [mockCocktail.id]: mockCocktail
        },
        selectedCocktailId: mockCocktail.id,
        loading: false,
        error: null,
        shownCocktailIds: [mockCocktail.id],
        selectedLanguage: 'EN'
      }
    };
    const result = selectCocktailsError(stateWithoutError);
    expect(result).toBeNull();
  });

  it('should return EN for selected language when no language is selected', () => {
    const stateWithoutLanguage = {
      cocktails: {
        ids: [mockCocktail.id],
        entities: {
          [mockCocktail.id]: mockCocktail
        },
        selectedCocktailId: mockCocktail.id,
        loading: false,
        error: null,
        shownCocktailIds: [mockCocktail.id],
        selectedLanguage: null
      }
    };
    const result = selectSelectedLanguage(stateWithoutLanguage);
    expect(result).toBe('EN');
  });
}); 