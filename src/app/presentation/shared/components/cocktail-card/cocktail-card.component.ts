import { Component, Input } from '@angular/core';
import { Cocktail } from '../../../../domain/models/cocktail.model';
import { Store } from '@ngrx/store';
import { CocktailActions } from '../../../../data/state/cocktail-state/cocktail.actions';
import { selectSelectedLanguage } from '../../../../data/state/cocktail-state/cocktail.selectors';
import { Observable } from 'rxjs';
import { Language } from '../../../../data/state/cocktail-state/cocktail.model';
import { AsyncPipe, NgFor } from '@angular/common';
import { TranslateInstructionsPipe } from '../../pipes/translate-instructions.pipe';
import { IngredientsPipe } from '../../pipes/ingredients.pipe';

@Component({
  selector: 'app-cocktail-card',
  templateUrl: './cocktail-card.component.html',
  styleUrls: ['./cocktail-card.component.scss'],
  standalone: true,
  imports: [AsyncPipe, NgFor, TranslateInstructionsPipe, IngredientsPipe]
})
export class CocktailCardComponent {
  @Input() cocktail!: Cocktail;
  selectedLanguage$: Observable<Language | null>;

  constructor(private store: Store) {
    this.selectedLanguage$ = this.store.select(selectSelectedLanguage);
  }

  onLanguageSelect(language: Language): void {
    this.store.dispatch(CocktailActions.selectLanguage({ language }));
  }
} 