import { Cocktail } from './cocktail.model';
import { Language } from './language.model';

describe('Cocktail Model', () => {
  it('should create a valid cocktail object', () => {
    const cocktail: Cocktail = {
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

    expect(cocktail).toBeDefined();
    expect(cocktail.id).toBe('12345');
    expect(cocktail.title).toBe('Test Cocktail');
    expect(cocktail.category).toBe('Test Category');
    expect(cocktail.alcoholic).toBe('Alcoholic');
    expect(cocktail.glass).toBe('Test Glass');
    expect(cocktail.imageUrl).toBe('http://test.com/image.jpg');
    expect(cocktail.instructions).toBeDefined();
    expect(cocktail.instructions.EN).toBe('Test instructions');
    expect(cocktail.ingredients).toHaveLength(1);
    expect(cocktail.ingredients[0]).toEqual({ ingredient: 'Ingredient 1', measure: '1 oz' });
  });

  it('should have all required properties', () => {
    const cocktail: Cocktail = {
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
      ingredients: []
    };

    expect(cocktail).toHaveProperty('id');
    expect(cocktail).toHaveProperty('title');
    expect(cocktail).toHaveProperty('category');
    expect(cocktail).toHaveProperty('alcoholic');
    expect(cocktail).toHaveProperty('glass');
    expect(cocktail).toHaveProperty('imageUrl');
    expect(cocktail).toHaveProperty('instructions');
    expect(cocktail).toHaveProperty('ingredients');
  });

  it('should have all required language translations', () => {
    const cocktail: Cocktail = {
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
      ingredients: []
    };

    const languages: Language[] = ['EN', 'ES', 'DE', 'FR', 'IT'];
    languages.forEach(lang => {
      expect(cocktail.instructions).toHaveProperty(lang);
    });
  });
}); 