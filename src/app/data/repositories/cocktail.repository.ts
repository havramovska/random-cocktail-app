import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Cocktail } from '../../domain/models/cocktail.model';
import { CocktailApiService } from '../datasources/api/cocktail-api.service';
import { ICocktailRepository } from '@app/domain/repositories/cocktail-repository.interface';
import { CocktailStorageService } from '../datasources/local/cocktail-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CocktailItemRepository implements ICocktailRepository {
  private requestCounter = 0;
  private nextCacheThreshold = this.generateRandomThreshold();

  constructor(
    private cocktailApiService: CocktailApiService,
    private cocktailStorageService: CocktailStorageService
  ) {}

  private generateRandomThreshold(): number {
    return Math.floor(Math.random() * 5) + 4;
  }

  getRandomCocktail(): Observable<Cocktail> {
    this.requestCounter++;
    
    if (this.requestCounter >= this.nextCacheThreshold) {
      const storedCocktail = this.cocktailStorageService.getRandomStoredCocktail([]);
      if (storedCocktail) {
        this.requestCounter = 0;
        this.nextCacheThreshold = this.generateRandomThreshold();
        return of(storedCocktail);
      }
    }
    
    return this.cocktailApiService.getRandomCocktail();
  }

  saveCocktail(cocktail: Cocktail): void {
    this.cocktailStorageService.storeCocktail(cocktail);
  }

  private storeItem(item: Cocktail): void {
    this.cocktailStorageService.storeCocktail(item);
  }

  private getRandomStoredItem(excludeIds: string[]): Cocktail | null {
    return this.cocktailStorageService.getRandomStoredCocktail(excludeIds);
  }
} 