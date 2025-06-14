import { Injectable, Inject } from '@angular/core';
import { IUseCase } from './base.use-case';
import { ICocktailRepository } from '../repositories/cocktail-repository.interface';
import { Cocktail } from '../models/cocktail.model';
import { COCKTAILS_REPOSITORY } from '../tokens/repository.tokens';

@Injectable({
  providedIn: 'root'
})
export class SaveCocktailUseCase implements IUseCase<Cocktail, void> {
  constructor(@Inject(COCKTAILS_REPOSITORY) private cocktailRepository: ICocktailRepository) {}

  execute(cocktail: Cocktail): void {
    this.cocktailRepository.saveCocktail(cocktail);
  }
} 