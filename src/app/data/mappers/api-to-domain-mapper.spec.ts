import { ApiToDomainDataMapper } from './api-to-domain-mapper';
import { Cocktail } from '@app/domain/models/cocktail.model';
import { CocktailResponse } from '@app/data/datasources/api/model/cocktail-response.model';

describe('ApiToDomainDataMapper', () => {
  const mockApiItem: CocktailResponse = {
    idDrink: '12345',
    strDrink: 'Test Cocktail',
    strCategory: 'Test Category',
    strAlcoholic: 'Alcoholic',
    strGlass: 'Test Glass',
    strDrinkThumb: 'http://test.com/image.jpg',
    strInstructions: 'Test instructions in English',
    strInstructionsES: 'Test instructions in Spanish',
    strInstructionsDE: 'Test instructions in German',
    strInstructionsFR: 'Test instructions in French',
    strInstructionsIT: 'Test instructions in Italian',
    strIngredient1: 'Ingredient 1',
    strMeasure1: '1 oz',
    strIngredient2: 'Ingredient 2',
    strMeasure2: '2 oz',
    strIngredient3: 'Ingredient 3',
    strMeasure3: '3 oz'
  };

  it('should map API item to domain model correctly', () => {
    const result = ApiToDomainDataMapper.mapApiItemToItem(mockApiItem);

    expect(result).toBeDefined();
    expect(result.id).toBe(mockApiItem.idDrink);
    expect(result.title).toBe(mockApiItem.strDrink);
    expect(result.category).toBe(mockApiItem.strCategory);
    expect(result.alcoholic).toBe(mockApiItem.strAlcoholic);
    expect(result.glass).toBe(mockApiItem.strGlass);
    expect(result.imageUrl).toBe(mockApiItem.strDrinkThumb);
  });

  it('should map instructions in all languages', () => {
    const result = ApiToDomainDataMapper.mapApiItemToItem(mockApiItem);

    expect(result.instructions).toEqual({
      EN: mockApiItem.strInstructions,
      ES: mockApiItem.strInstructionsES,
      DE: mockApiItem.strInstructionsDE,
      FR: mockApiItem.strInstructionsFR,
      IT: mockApiItem.strInstructionsIT
    });
  });

  it('should map ingredients with measures', () => {
    const result = ApiToDomainDataMapper.mapApiItemToItem(mockApiItem);

    expect(result.ingredients).toHaveLength(3);
    expect(result.ingredients[0]).toEqual({
      ingredient: 'Ingredient 1',
      measure: '1 oz'
    });
    expect(result.ingredients[1]).toEqual({
      ingredient: 'Ingredient 2',
      measure: '2 oz'
    });
    expect(result.ingredients[2]).toEqual({
      ingredient: 'Ingredient 3',
      measure: '3 oz'
    });
  });

  it('should handle missing optional fields', () => {
    const incompleteApiItem: CocktailResponse = {
      ...mockApiItem,
      strInstructionsES: undefined,
      strMeasure2: undefined
    };

    const result = ApiToDomainDataMapper.mapApiItemToItem(incompleteApiItem);

    expect(result.instructions.ES).toBe('');
    expect(result.ingredients[1].measure).toBe('');
  });

  it('should handle empty API item', () => {
    const emptyApiItem: CocktailResponse = {
      idDrink: '',
      strDrink: '',
      strCategory: '',
      strAlcoholic: '',
      strGlass: '',
      strDrinkThumb: '',
      strInstructions: ''
    };

    const result = ApiToDomainDataMapper.mapApiItemToItem(emptyApiItem);

    expect(result).toBeDefined();
    expect(result.id).toBe('');
    expect(result.title).toBe('');
    expect(result.ingredients).toHaveLength(0);
  });

  it('should handle maximum number of ingredients', () => {
    const fullIngredientsApiItem: CocktailResponse = {
      ...mockApiItem,
      strIngredient1: 'Ingredient 1',
      strMeasure1: '1 oz',
      strIngredient2: 'Ingredient 2',
      strMeasure2: '2 oz',
      strIngredient3: 'Ingredient 3',
      strMeasure3: '3 oz',
      strIngredient4: 'Ingredient 4',
      strMeasure4: '4 oz',
      strIngredient5: 'Ingredient 5',
      strMeasure5: '5 oz',
      strIngredient6: 'Ingredient 6',
      strMeasure6: '6 oz',
      strIngredient7: 'Ingredient 7',
      strMeasure7: '7 oz',
      strIngredient8: 'Ingredient 8',
      strMeasure8: '8 oz',
      strIngredient9: 'Ingredient 9',
      strMeasure9: '9 oz',
      strIngredient10: 'Ingredient 10',
      strMeasure10: '10 oz',
      strIngredient11: 'Ingredient 11',
      strMeasure11: '11 oz',
      strIngredient12: 'Ingredient 12',
      strMeasure12: '12 oz',
      strIngredient13: 'Ingredient 13',
      strMeasure13: '13 oz',
      strIngredient14: 'Ingredient 14',
      strMeasure14: '14 oz',
      strIngredient15: 'Ingredient 15',
      strMeasure15: '15 oz'
    };

    const result = ApiToDomainDataMapper.mapApiItemToItem(fullIngredientsApiItem);

    expect(result.ingredients).toHaveLength(15);
    expect(result.ingredients[14]).toEqual({
      ingredient: 'Ingredient 15',
      measure: '15 oz'
    });
  });
}); 