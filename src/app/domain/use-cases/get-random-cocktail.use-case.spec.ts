import { TestBed } from '@angular/core/testing';
import { GetRandomCocktailUseCase } from './get-random-cocktail.use-case';
import { ICocktailRepository } from '../repositories/cocktail-repository.interface';
import { COCKTAILS_REPOSITORY } from '../tokens/repository.tokens';
import { of } from 'rxjs';
import { Cocktail } from '../models/cocktail.model';
import { Ingredient } from '../models/ingridient.model';

describe('GetRandomCocktailUseCase', () => {
  let useCase: GetRandomCocktailUseCase;
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
      getRandomCocktail: jest.fn().mockReturnValue(of(mockCocktail)),
      saveCocktail: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        GetRandomCocktailUseCase,
        { provide: COCKTAILS_REPOSITORY, useValue: mockRepository }
      ]
    });

    useCase = TestBed.inject(GetRandomCocktailUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should execute and return a random cocktail', () => {
    useCase.execute().subscribe(cocktail => {
      expect(cocktail).toEqual(mockCocktail);
      expect(mockRepository.getRandomCocktail).toHaveBeenCalled();
    });
  });
}); 