import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cocktail } from '../../../domain/models/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailLocalService {
  private readonly mockCocktails: Cocktail[] = [
    {
      id: '1',
      title: 'Mojito',
      alcoholic: 'Alcoholic',
      category: 'Cocktail',
      glass: 'Highball glass',
      imageUrl: 'https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg',
      instructions: {
        EN: 'Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Garnish with mint leaves and serve.',
        ES: '',
        DE: '',
        FR: '',
        IT: ''
      },
      ingredients: [
        { ingredient: 'White rum', measure: '60ml' },
        { ingredient: 'Lime', measure: '1' },
        { ingredient: 'Sugar', measure: '2 tsp' },
        { ingredient: 'Mint', measure: '6' },
        { ingredient: 'Soda water', measure: 'Top up' }
      ]
    },
    {
      id: '2',
      title: 'Old Fashioned',
      alcoholic: 'Alcoholic',
      category: 'Cocktail',
      glass: 'Old-fashioned glass',
      imageUrl: 'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg',
      instructions: {
        EN: 'Place sugar cube in old fashioned glass and saturate with bitters, add a dash of plain water. Muddle until dissolved. Fill the glass with ice cubes and add whiskey. Garnish with orange twist, and a cocktail cherry.',
        ES: '',
        DE: '',
        FR: '',
        IT: ''
      },
      ingredients: [
        { ingredient: 'Bourbon', measure: '4.5 cL' },
        { ingredient: 'Angostura bitters', measure: '2 dashes' },
        { ingredient: 'Sugar', measure: '1 cube' },
        { ingredient: 'Water', measure: 'dash' }
      ]
    }
  ];

  constructor() {}

  getRandomCocktail(): Observable<Cocktail> {
    const randomIndex = Math.floor(Math.random() * this.mockCocktails.length);
    return of(this.mockCocktails[randomIndex]);
  }

  getCocktailById(id: string): Observable<Cocktail> {
    const cocktail = this.mockCocktails.find(c => c.id === id);
    if (!cocktail) {
      throw new Error('Cocktail not found');
    }
    return of(cocktail);
  }
} 