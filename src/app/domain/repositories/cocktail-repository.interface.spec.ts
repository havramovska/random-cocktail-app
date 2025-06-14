import { Observable, of } from 'rxjs';
import { ICocktailRepository } from './cocktail-repository.interface';
import { Cocktail } from '../models/cocktail.model';

describe('ICocktailRepository Interface', () => {
  // Create a mock implementation of the interface for testing
  class MockCocktailRepository implements ICocktailRepository {
    private storedCocktail: Cocktail | null = null;

    getRandomCocktail(): Observable<Cocktail> {
      if (this.storedCocktail) {
        return of(this.storedCocktail);
      }
      return of({
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
      });
    }

    saveCocktail(cocktail: Cocktail): void {
      this.storedCocktail = cocktail;
    }
  }

  let repository: ICocktailRepository;

  beforeEach(() => {
    repository = new MockCocktailRepository();
  });

  it('should be implemented by a class', () => {
    expect(repository).toBeDefined();
    expect(repository instanceof MockCocktailRepository).toBeTruthy();
  });

  it('should have getRandomCocktail method that returns Observable<Cocktail>', () => {
    const result = repository.getRandomCocktail();
    expect(result).toBeDefined();
    expect(result instanceof Observable).toBeTruthy();

    result.subscribe(cocktail => {
      expect(cocktail).toBeDefined();
      expect(cocktail).toHaveProperty('id');
      expect(cocktail).toHaveProperty('title');
      expect(cocktail).toHaveProperty('category');
      expect(cocktail).toHaveProperty('alcoholic');
      expect(cocktail).toHaveProperty('glass');
      expect(cocktail).toHaveProperty('imageUrl');
      expect(cocktail).toHaveProperty('instructions');
      expect(cocktail).toHaveProperty('ingredients');
    });
  });

  it('should have saveCocktail method that accepts a Cocktail parameter', () => {
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

    // Verify the method exists and can be called
    expect(() => repository.saveCocktail(cocktail)).not.toThrow();

    // Verify the cocktail was saved by getting it back
    repository.getRandomCocktail().subscribe(savedCocktail => {
      expect(savedCocktail).toEqual(cocktail);
    });
  });

  it('should maintain the contract for any implementation', () => {
    // Verify the interface methods
    expect(typeof repository.getRandomCocktail).toBe('function');
    expect(typeof repository.saveCocktail).toBe('function');

    // Verify method signatures
    const getRandomCocktailMethod = repository.getRandomCocktail;
    const saveCocktailMethod = repository.saveCocktail;

    expect(getRandomCocktailMethod.length).toBe(0); // No parameters
    expect(saveCocktailMethod.length).toBe(1); // One parameter
  });
}); 