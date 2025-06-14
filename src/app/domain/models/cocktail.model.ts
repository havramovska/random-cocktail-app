import { Ingredient } from "./ingridient.model";
import { Language } from "./language.model";

export interface Cocktail {
  id: string;
  title: string;
  category: string;
  alcoholic: string;
  glass: string;
  imageUrl: string;
  instructions: Record<Language, string>;
  ingredients: Ingredient[];
} 