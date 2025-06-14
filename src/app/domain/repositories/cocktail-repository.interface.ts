import { Observable } from 'rxjs';
import { Cocktail } from '../models/cocktail.model';

export interface ICocktailRepository {
  getRandomCocktail(): Observable<Cocktail>;
  saveCocktail(cocktail: Cocktail): void;
} 