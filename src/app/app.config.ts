import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CocktailItemRepository } from './data/repositories/cocktail.repository';
import { cocktailsReducer } from './data/state/cocktail-state/cocktail.reducer';
import { COCKTAILS_REPOSITORY } from './domain/tokens/repository.tokens';
import { CocktailEffects } from './data/state/cocktail-state/cocktail.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideStore({ cocktails: cocktailsReducer }),
    provideEffects([CocktailEffects]),
    provideHttpClient(),
    {
      provide: COCKTAILS_REPOSITORY,
      useClass: CocktailItemRepository
    }
  ]
};
