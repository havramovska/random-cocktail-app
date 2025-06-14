import { EntityState } from '@ngrx/entity';
import { Cocktail } from '../../../domain/models/cocktail.model';

export type Language = 'EN' | 'ES' | 'DE' | 'FR' | 'IT';

export interface CocktailsState extends EntityState<Cocktail> {
  selectedCocktailId: string | null;
  loading: boolean;
  error: string | null;
  shownCocktailIds: string[];
  selectedLanguage: Language | null;
} 