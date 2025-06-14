import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { CocktailEffects } from './cocktail.effects';
import { CocktailActions } from './cocktail.actions';
import { SaveCocktailUseCase } from '../../../domain/use-cases/save-cocktail.use-case';
import { GetRandomCocktailUseCase } from '../../../domain/use-cases/get-random-cocktail.use-case';
import { Cocktail } from '@app/domain/models/cocktail.model';
import { provideMockStore } from '@ngrx/store/testing';
import { cocktailsReducer } from './cocktail.reducer';
import { COCKTAILS_REPOSITORY } from '@app/domain/tokens/repository.tokens';
import { CocktailItemRepository } from '@app/data/repositories/cocktail.repository';

describe('CocktailEffects', () => {
  let effects: CocktailEffects;
  let actions$: Observable<any>;
  let getRandomCocktailUseCase: jest.Mocked<GetRandomCocktailUseCase>;
  let saveCocktailUseCase: jest.Mocked<SaveCocktailUseCase>;
  let repository: jest.Mocked<CocktailItemRepository>;

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
    getRandomCocktailUseCase = {
      execute: jest.fn()
    } as any;

    saveCocktailUseCase = {
      execute: jest.fn()
    } as any;

    repository = {
      getRandomCocktail: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      providers: [
        CocktailEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            cocktails: cocktailsReducer(undefined, { type: 'INIT' })
          }
        }),
        { provide: GetRandomCocktailUseCase, useValue: getRandomCocktailUseCase },
        { provide: SaveCocktailUseCase, useValue: saveCocktailUseCase },
        { provide: COCKTAILS_REPOSITORY, useValue: repository }
      ]
    });

    effects = TestBed.inject(CocktailEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should load random cocktail successfully', (done) => {
    getRandomCocktailUseCase.execute.mockReturnValue(of(mockCocktail));
    saveCocktailUseCase.execute.mockImplementation(() => {});

    actions$ = of(CocktailActions.loadRandomCocktail());

    effects.loadRandomCocktail$.subscribe(action => {
      expect(action).toEqual(CocktailActions.loadRandomCocktailSuccess({ cocktail: mockCocktail }));
      expect(getRandomCocktailUseCase.execute).toHaveBeenCalled();
      expect(saveCocktailUseCase.execute).toHaveBeenCalledWith(mockCocktail);
      done();
    });
  });

  it('should handle error when loading random cocktail', (done) => {
    const error = new Error('Test error');
    getRandomCocktailUseCase.execute.mockReturnValue(throwError(() => error));

    actions$ = of(CocktailActions.loadRandomCocktail());

    effects.loadRandomCocktail$.subscribe(action => {
      expect(action).toEqual(CocktailActions.loadRandomCocktailFailure({ error: error.message }));
      expect(getRandomCocktailUseCase.execute).toHaveBeenCalled();
      expect(saveCocktailUseCase.execute).not.toHaveBeenCalled();
      done();
    });
  });
}); 