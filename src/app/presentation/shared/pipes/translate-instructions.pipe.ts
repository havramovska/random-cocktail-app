import { Pipe, PipeTransform } from '@angular/core';
import { Cocktail } from '../../../domain/models/cocktail.model';
import { Language } from '@app/domain/models/language.model';

@Pipe({
  name: 'translateInstructions',
  standalone: true
})
export class TranslateInstructionsPipe implements PipeTransform {
  transform(item: Cocktail, lang: Language | null | undefined): string {
    if (!item) return 'No instructions available.';
    
    const instructions = lang ? item.instructions[lang] : item.instructions.EN;
    
    const fallbackInstructions = item.instructions.EN;
    
    return (instructions || fallbackInstructions || 'No instructions available.').replace(/\n/g, '<br>');
  }
} 