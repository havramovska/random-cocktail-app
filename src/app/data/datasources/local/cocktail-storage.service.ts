import { Injectable } from '@angular/core';
import { Cocktail } from '../../../domain/models/cocktail.model';
import { StorageService } from './storage.service';
import { STORAGE_KEYS } from './storage.constants';

@Injectable({
  providedIn: 'root'
})
export class CocktailStorageService {
  constructor(private storageService: StorageService) {}

  getStoredCocktails(): Cocktail[] {
    return this.storageService.getItem<Cocktail[]>(STORAGE_KEYS.RANDOM_COCKTAILS) || [];
  }

  storeCocktail(cocktail: Cocktail): void {
    const cocktails = this.getStoredCocktails();
    if (!cocktails.some(c => c.id === cocktail.id)) {
      const updatedCocktails = [...cocktails, cocktail];
      this.storageService.setItem(STORAGE_KEYS.RANDOM_COCKTAILS, updatedCocktails);
    }
  }

  getRandomStoredCocktail(excludeIds: string[]): Cocktail | null {
    const cocktails = this.getStoredCocktails();
    const availableCocktails = cocktails.filter(cocktail => !excludeIds.includes(cocktail.id));

    if (availableCocktails.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * availableCocktails.length);
    return availableCocktails[randomIndex];
  }
} 