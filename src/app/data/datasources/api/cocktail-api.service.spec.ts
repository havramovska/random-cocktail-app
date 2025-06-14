import { TestBed } from '@angular/core/testing';
import { CocktailApiService } from './cocktail-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Cocktail } from '@app/domain/models/cocktail.model';
import { environment } from '../../../../environments/environment';

describe('CocktailApiService', () => {
  let service: CocktailApiService;
  let httpMock: HttpTestingController;

  const mockApiResponse = {
    drinks: [{
      idDrink: '12345',
      strDrink: 'Test Cocktail',
      strCategory: 'Test Category',
      strAlcoholic: 'Alcoholic',
      strGlass: 'Test Glass',
      strDrinkThumb: 'http://test.com/image.jpg',
      strInstructions: 'Test instructions',
      strIngredient1: 'Ingredient 1',
      strMeasure1: '1 oz'
    }]
  };

  const expectedCocktail: Cocktail = {
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
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CocktailApiService]
    });
    service = TestBed.inject(CocktailApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a random cocktail from the API', (done) => {
    service.getRandomCocktail().subscribe(cocktail => {
      expect(cocktail).toEqual(expectedCocktail);
      done();
    });

    const req = httpMock.expectOne(environment.cocktailApiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });

  it('should handle empty drinks array in response', (done) => {
    service.getRandomCocktail().subscribe({
      error: (error) => {
        expect(error.message).toContain('No drinks found in the response');
        done();
      }
    });

    const req = httpMock.expectOne(environment.cocktailApiUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ drinks: [] });
  });

  it('should handle API errors', (done) => {
    service.getRandomCocktail().subscribe({
      error: (error) => {
        expect(error.message).toContain('Failed to fetch cocktail');
        done();
      }
    });

    const req = httpMock.expectOne(environment.cocktailApiUrl);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error'));
  });
}); 