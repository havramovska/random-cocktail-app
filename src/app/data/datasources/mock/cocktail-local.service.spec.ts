import { TestBed } from '@angular/core/testing';
import { CocktailLocalService } from './cocktail-local.service';
import { Cocktail } from '@app/domain/models/cocktail.model';
import { of, throwError } from 'rxjs';

describe('CocktailLocalService', () => {
  let service: CocktailLocalService;

  const mockCocktails: Cocktail[] = [
    {
      id: '1',
      title: 'Test Cocktail 1',
      category: 'Test Category',
      alcoholic: 'Alcoholic',
      glass: 'Test Glass',
      imageUrl: 'http://test.com/image1.jpg',
      instructions: {
        EN: 'Test instructions 1',
        ES: '',
        DE: '',
        FR: '',
        IT: ''
      },
      ingredients: [
        { ingredient: 'Ingredient 1', measure: '1 oz' }
      ]
    },
    {
      id: '2',
      title: 'Test Cocktail 2',
      category: 'Test Category',
      alcoholic: 'Alcoholic',
      glass: 'Test Glass',
      imageUrl: 'http://test.com/image2.jpg',
      instructions: {
        EN: 'Test instructions 2',
        ES: '',
        DE: '',
        FR: '',
        IT: ''
      },
      ingredients: [
        { ingredient: 'Ingredient 2', measure: '2 oz' }
      ]
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CocktailLocalService]
    });
    service = TestBed.inject(CocktailLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a random cocktail from the mock data', (done) => {
    service.getRandomCocktail().subscribe(cocktail => {
      expect(cocktail).toBeDefined();
      expect(cocktail.id).toBeDefined();
      expect(cocktail.title).toBeDefined();
      expect(cocktail.category).toBeDefined();
      expect(cocktail.alcoholic).toBeDefined();
      expect(cocktail.glass).toBeDefined();
      expect(cocktail.imageUrl).toBeDefined();
      expect(cocktail.instructions).toBeDefined();
      expect(cocktail.ingredients).toBeDefined();
      done();
    });
  });
}); 