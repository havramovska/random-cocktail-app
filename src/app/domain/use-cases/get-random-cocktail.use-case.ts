import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IUseCase } from './base.use-case';
import { ICocktailRepository } from '../repositories/cocktail-repository.interface';
import { Cocktail } from '../models/cocktail.model';
import { COCKTAILS_REPOSITORY } from '../tokens/repository.tokens';

@Injectable({
  providedIn: 'root'
})
export class GetRandomCocktailUseCase implements IUseCase<void, Observable<Cocktail>> {
  constructor(@Inject(COCKTAILS_REPOSITORY) private cocktailRepository: ICocktailRepository) {}

  execute(): Observable<Cocktail> {
    return this.cocktailRepository.getRandomCocktail();
  }
} 