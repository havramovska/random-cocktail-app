import { Ingredient } from './ingridient.model';

describe('Ingredient Model', () => {
  it('should create a valid ingredient object', () => {
    const ingredient: Ingredient = {
      ingredient: 'Test Ingredient',
      measure: '1 oz'
    };

    expect(ingredient).toBeDefined();
    expect(ingredient.ingredient).toBe('Test Ingredient');
    expect(ingredient.measure).toBe('1 oz');
  });

  it('should have all required properties', () => {
    const ingredient: Ingredient = {
      ingredient: 'Test Ingredient',
      measure: '1 oz'
    };

    expect(ingredient).toHaveProperty('ingredient');
    expect(ingredient).toHaveProperty('measure');
  });

  it('should allow empty measure', () => {
    const ingredient: Ingredient = {
      ingredient: 'Test Ingredient',
      measure: ''
    };

    expect(ingredient.measure).toBe('');
  });
}); 