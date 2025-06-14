import { TestBed } from '@angular/core/testing';
import { CocktailItemRepository } from './cocktail.repository';
import { CocktailApiService } from '../datasources/api/cocktail-api.service';
import { CocktailStorageService } from '../datasources/local/cocktail-storage.service';
import { of, throwError } from 'rxjs';
import { Cocktail } from '@app/domain/models/cocktail.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CocktailItemRepository', () => {
  let repository: CocktailItemRepository;
  let apiService: jest.Mocked<CocktailApiService>;
  let storageService: jest.Mocked<CocktailStorageService>;

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

  beforeEach(() => {
    apiService = {
      getRandomCocktail: jest.fn().mockReturnValue(of(mockCocktail))
    } as any;

    storageService = {
      storeCocktail: jest.fn(),
      getRandomStoredCocktail: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CocktailItemRepository,
        { provide: CocktailApiService, useValue: apiService },
        { provide: CocktailStorageService, useValue: storageService }
      ]
    });

    repository = TestBed.inject(CocktailItemRepository);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should get random cocktail from API when no stored cocktails', (done) => {
    storageService.getRandomStoredCocktail.mockReturnValue(null);
    repository['nextCacheThreshold'] = 100; // ensure API is always used
    repository['requestCounter'] = 0;
    repository.getRandomCocktail().subscribe({
      next: (cocktail) => {
        expect(cocktail).toEqual(mockCocktail);
        expect(apiService.getRandomCocktail).toHaveBeenCalled();
        done();
      }
    });
  });

  it('should get random cocktail from storage when available and threshold reached', (done) => {
    storageService.getRandomStoredCocktail.mockReturnValue(mockCocktail);
    repository['nextCacheThreshold'] = 1;
    repository['requestCounter'] = 0;
    repository.getRandomCocktail().subscribe({
      next: (cocktail) => {
        expect(cocktail).toEqual(mockCocktail);
        expect(storageService.getRandomStoredCocktail).toHaveBeenCalled();
        done();
      }
    });
  });

  it('should save cocktail to storage', () => {
    repository.saveCocktail(mockCocktail);
    expect(storageService.storeCocktail).toHaveBeenCalledWith(mockCocktail);
  });

  it('should handle API errors gracefully', (done) => {
    const error = new Error('API Error');
    apiService.getRandomCocktail.mockReturnValue(throwError(() => error));
    storageService.getRandomStoredCocktail.mockReturnValue(null);

    repository.getRandomCocktail().subscribe({
      error: (err) => {
        expect(err).toBe(error);
        done();
      }
    });
  });

  it('should reset counter and threshold after getting stored cocktail', (done) => {
    storageService.getRandomStoredCocktail.mockReturnValue(mockCocktail);
    repository['nextCacheThreshold'] = 1;
    repository['requestCounter'] = 0;
    repository.getRandomCocktail().subscribe({
      next: (cocktail) => {
        expect(cocktail).toEqual(mockCocktail);
        expect(storageService.getRandomStoredCocktail).toHaveBeenCalled();
        // Next call should go to API again
        repository['nextCacheThreshold'] = 100; // ensure API is used next
        repository.getRandomCocktail().subscribe({
          next: () => {
            expect(apiService.getRandomCocktail).toHaveBeenCalled();
            done();
          }
        });
      }
    });
  });
}); 