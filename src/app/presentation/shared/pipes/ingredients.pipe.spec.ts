import { IngredientsPipe } from './ingredients.pipe';
import { Cocktail } from '@app/domain/models/cocktail.model';

describe('IngredientsPipe', () => {
  let pipe: IngredientsPipe;

  const mockCocktail: Cocktail = {
    id: '1',
    title: 'Test Cocktail',
    category: 'Test Category',
    alcoholic: 'Alcoholic',
    glass: 'Test Glass',
    imageUrl: 'test.jpg',
    instructions: {
      EN: 'English instructions',
      ES: 'Spanish instructions',
      DE: 'German instructions',
      FR: 'French instructions',
      IT: 'Italian instructions'
    },
    ingredients: [
      { ingredient: 'Ingredient 1', measure: '1 oz' },
      { ingredient: 'Ingredient 2', measure: '2 oz' },
      { ingredient: 'Ingredient 3', measure: '' }
    ]
  };

  beforeEach(() => {
    pipe = new IngredientsPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform cocktail ingredients correctly', () => {
    const result = pipe.transform(mockCocktail);
    expect(result).toEqual(mockCocktail.ingredients);
  });

  it('should return empty array when cocktail is null', () => {
    const result = pipe.transform(null as unknown as Cocktail);
    expect(result).toEqual([]);
  });

  it('should handle cocktails with no ingredients', () => {
    const cocktailWithoutIngredients: Cocktail = {
      ...mockCocktail,
      ingredients: []
    };
    const result = pipe.transform(cocktailWithoutIngredients);
    expect(result).toEqual([]);
  });

  it('should handle ingredients with empty measures', () => {
    const result = pipe.transform(mockCocktail);
    const ingredientWithEmptyMeasure = result.find(i => i.ingredient === 'Ingredient 3');
    expect(ingredientWithEmptyMeasure?.measure).toBe('');
  });
}); 