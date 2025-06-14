import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CocktailCardComponent } from './cocktail-card.component';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CocktailActions } from '@app/data/state/cocktail-state/cocktail.actions';
import { Cocktail } from '@app/domain/models/cocktail.model';
import { Language } from '@app/domain/models/language.model';
import { TranslateInstructionsPipe } from '../../pipes/translate-instructions.pipe';
import { IngredientsPipe } from '../../pipes/ingredients.pipe';
import { AsyncPipe, NgFor } from '@angular/common';

describe('CocktailCardComponent', () => {
  let component: CocktailCardComponent;
  let fixture: ComponentFixture<CocktailCardComponent>;
  let store: MockStore;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CocktailCardComponent,
        TranslateInstructionsPipe,
        IngredientsPipe,
        AsyncPipe,
        NgFor
      ],
      providers: [
        provideMockStore({
          initialState: {
            cocktail: {
              selectedLanguage: 'EN' as Language
            }
          }
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CocktailCardComponent);
    component = fixture.componentInstance;
    component.cocktail = mockCocktail;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cocktail information', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain(mockCocktail.title);
    expect(compiled.textContent).toContain(mockCocktail.category);
    expect(compiled.textContent).toContain(mockCocktail.alcoholic);
    expect(compiled.textContent).toContain(mockCocktail.glass);
  });

  it('should display ingredients and measures', () => {
    const compiled = fixture.nativeElement;
    mockCocktail.ingredients.forEach(ingredient => {
      expect(compiled.textContent).toContain(ingredient.ingredient);
      expect(compiled.textContent).toContain(ingredient.measure);
    });
  });

  it('should dispatch selectLanguage action when language is selected', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.onLanguageSelect('ES' as Language);
    expect(dispatchSpy).toHaveBeenCalledWith(
      CocktailActions.selectLanguage({ language: 'ES' as Language })
    );
  });

  it('should display instructions in selected language', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain(mockCocktail.instructions.EN);
  });
}); 