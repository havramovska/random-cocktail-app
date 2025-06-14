import { TestBed } from '@angular/core/testing';
import { SaveCocktailUseCase } from './save-cocktail.use-case';
import { ICocktailRepository } from '../repositories/cocktail-repository.interface';
import { COCKTAILS_REPOSITORY } from '../tokens/repository.tokens';
import { Cocktail } from '../models/cocktail.model';

describe('SaveCocktailUseCase', () => {
  let useCase: SaveCocktailUseCase;
  let mockRepository: jest.Mocked<ICocktailRepository>;

  const mockCocktail: Cocktail = {
    id: '1',
    title: 'Test Cocktail',
    category: 'Test Category',
    alcoholic: 'Alcoholic',
    glass: 'Test Glass',
    imageUrl: 'test.jpg',
    instructions: {
      EN: 'Test Instructions',
      ES: 'Instrucciones de prueba',
      DE: 'Testanweisungen',
      FR: 'Instructions de test',
      IT: 'Istruzioni di test'
    },
    ingredients: [
      {
        ingredient: 'Ingredient 1',
        measure: 'Measure 1'
      }
    ]
  };

  beforeEach(() => {
    mockRepository = {
      getRandomCocktail: jest.fn(),
      saveCocktail: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        SaveCocktailUseCase,
        { provide: COCKTAILS_REPOSITORY, useValue: mockRepository }
      ]
    });

    useCase = TestBed.inject(SaveCocktailUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should execute and save a cocktail', () => {
    useCase.execute(mockCocktail);
    expect(mockRepository.saveCocktail).toHaveBeenCalledWith(mockCocktail);
  });
}); 