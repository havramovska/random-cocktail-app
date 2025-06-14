import { ICocktailRepository } from '../repositories/cocktail-repository.interface';
import { InjectionToken } from '@angular/core';

export const COCKTAILS_REPOSITORY = new InjectionToken<ICocktailRepository>('COCKTAILS_REPOSITORY'); 