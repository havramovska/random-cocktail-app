import { Language } from './cocktail.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Cocktail } from '../../../domain/models/cocktail.model';

export const CocktailActions = createActionGroup({
  source: 'Cocktails',
  events: {
    'Load Cocktails': emptyProps(),
    'Load Cocktails Success': props<{ cocktails: Cocktail[] }>(),
    'Load Cocktails Failure': props<{ error: string }>(),

    'Load Random Cocktail': emptyProps(),
    'Load Random Cocktail Success': props<{ cocktail: Cocktail }>(),
    'Load Random Cocktail Failure': props<{ error: string }>(),

    'Select Cocktail': props<{ cocktailId: string }>(),
    'Clear Selected Cocktail': emptyProps(),
    'Select Another Random Cocktail': emptyProps(),

    'Select Language': props<{ language: Language }>(),
  }
}); 