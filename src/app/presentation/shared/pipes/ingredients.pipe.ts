import { Pipe, PipeTransform } from '@angular/core';
import { Cocktail } from '@app/domain/models/cocktail.model';

@Pipe({
  name: 'ingredients',
  standalone: true
})
export class IngredientsPipe implements PipeTransform {
  transform(item: Cocktail): { ingredient: string; measure: string; }[] {
    if (!item) return [];
    return item.ingredients || [];
  }
} 