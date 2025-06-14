import { TranslateInstructionsPipe } from './translate-instructions.pipe';
import { Cocktail } from '@app/domain/models/cocktail.model';
import { Language } from '@app/domain/models/language.model';

describe('TranslateInstructionsPipe', () => {
  let pipe: TranslateInstructionsPipe;

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
      { ingredient: 'Ingredient 2', measure: '2 oz' }
    ]
  };

  beforeEach(() => {
    pipe = new TranslateInstructionsPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return English instructions when no language is specified', () => {
    const result = pipe.transform(mockCocktail, null);
    expect(result).toBe(mockCocktail.instructions.EN);
  });

  it('should return instructions in the specified language', () => {
    const result = pipe.transform(mockCocktail, 'ES' as Language);
    expect(result).toBe(mockCocktail.instructions.ES);
  });

  it('should return English instructions as fallback when specified language is not available', () => {
    const result = pipe.transform(mockCocktail, 'XX' as Language);
    expect(result).toBe(mockCocktail.instructions.EN);
  });

  it('should return default message when cocktail has no instructions', () => {
    const cocktailWithoutInstructions: Cocktail = {
      ...mockCocktail,
      instructions: {} as Record<Language, string>
    };
    const result = pipe.transform(cocktailWithoutInstructions, 'EN' as Language);
    expect(result).toBe('No instructions available.');
  });

  it('should replace newlines with HTML line breaks', () => {
    const cocktailWithNewlines: Cocktail = {
      ...mockCocktail,
      instructions: {
        ...mockCocktail.instructions,
        EN: 'Line 1\nLine 2'
      }
    };
    const result = pipe.transform(cocktailWithNewlines, 'EN' as Language);
    expect(result).toBe('Line 1<br>Line 2');
  });
}); 