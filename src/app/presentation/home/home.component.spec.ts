import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Store } from '@ngrx/store';
import { CocktailActions } from '../../data/state/cocktail-state/cocktail.actions';
import { selectCocktailsError, selectCocktailsLoading, selectSelectedCocktail } from '../../data/state/cocktail-state/cocktail.selectors';
import { of } from 'rxjs';
import { CocktailCardComponent } from '../shared/components/cocktail-card/cocktail-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { Cocktail } from '@app/domain/models/cocktail.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: jest.Mocked<Store>;

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

  beforeEach(async () => {
    const storeMock = {
      select: jest.fn(),
      dispatch: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [HomeComponent, CocktailCardComponent, MatProgressSpinnerModule],
      providers: [{ provide: Store, useValue: storeMock }]
    }).compileComponents();

    store = TestBed.inject(Store) as jest.Mocked<Store>;
  });

  beforeEach(() => {
    // Default: all selectors return null
    store.select.mockImplementation((selector) => {
      switch (selector) {
        case selectSelectedCocktail:
          return of(null);
        case selectCocktailsLoading:
          return of(false);
        case selectCocktailsError:
          return of(null);
        default:
          return of(null);
      }
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadRandomCocktail on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(CocktailActions.loadRandomCocktail());
  });

  it('should dispatch loadRandomCocktail when refresh button is clicked', () => {
    const refreshButton = fixture.debugElement.query(By.css('.refresh-button'));
    refreshButton.triggerEventHandler('click', null);
    expect(store.dispatch).toHaveBeenCalledWith(CocktailActions.loadRandomCocktail());
  });

  it('should show loading spinner when loading$ is true', () => {
    store.select.mockImplementation((selector) => {
      if (selector === selectCocktailsLoading) return of(true);
      if (selector === selectSelectedCocktail) return of(null);
      if (selector === selectCocktailsError) return of(null);
      return of(null);
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeTruthy();
    const cocktailCard = fixture.debugElement.query(By.directive(CocktailCardComponent));
    expect(cocktailCard).toBeFalsy();
  });

  it('should show error message when error$ has value', () => {
    const testError = 'Test error';
    store.select.mockImplementation((selector) => {
      if (selector === selectCocktailsError) return of(testError);
      if (selector === selectSelectedCocktail) return of(null);
      if (selector === selectCocktailsLoading) return of(false);
      return of(null);
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('.error-message'));
    expect(error).toBeTruthy();
    expect(error.nativeElement.textContent).toContain(testError);
    const cocktailCard = fixture.debugElement.query(By.directive(CocktailCardComponent));
    expect(cocktailCard).toBeFalsy();
  });

  it('should show CocktailCardComponent when selectedCocktail$ has value', () => {
    store.select.mockImplementation((selector) => {
      if (selector === selectSelectedCocktail) return of(mockCocktail);
      if (selector === selectCocktailsLoading) return of(false);
      if (selector === selectCocktailsError) return of(null);
      return of(null);
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const cocktailCard = fixture.debugElement.query(By.directive(CocktailCardComponent));
    expect(cocktailCard).toBeTruthy();
    expect(cocktailCard.componentInstance.cocktail).toEqual(mockCocktail);
    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeFalsy();
  });

  it('should show refresh button when cocktail is loaded', () => {
    store.select.mockImplementation((selector) => {
      if (selector === selectSelectedCocktail) return of(mockCocktail);
      if (selector === selectCocktailsLoading) return of(false);
      if (selector === selectCocktailsError) return of(null);
      return of(null);
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const refreshButton = fixture.debugElement.query(By.css('.refresh-button'));
    expect(refreshButton).toBeTruthy();
    expect(refreshButton.nativeElement.textContent).toContain('Get Another Cocktail');
  });

  it('should not show refresh button when loading', () => {
    store.select.mockImplementation((selector) => {
      if (selector === selectCocktailsLoading) return of(true);
      if (selector === selectSelectedCocktail) return of(null);
      if (selector === selectCocktailsError) return of(null);
      return of(null);
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const refreshButton = fixture.debugElement.query(By.css('.refresh-button'));
    expect(refreshButton).toBeFalsy();
  });
});
