import { Cocktail } from "@app/domain/models/cocktail.model";
import { CocktailResponse } from "@app/data/datasources/api/model/cocktail-response.model";

export class ApiToDomainDataMapper {

   public static mapApiItemToItem(apiItem: CocktailResponse): Cocktail {
        const ingredients = [];
    
        for (let i = 1; i <= 15; i++) {
          const ingredient = apiItem[`strIngredient${i}` as keyof CocktailResponse];
          const measure = apiItem[`strMeasure${i}` as keyof CocktailResponse];
    
          if (ingredient) {
            ingredients.push({
              ingredient,
              measure: measure || ''
            });
          }
        }
    
        const instructions = {
          EN: apiItem.strInstructions || '',
          ES: apiItem.strInstructionsES || '',
          DE: apiItem.strInstructionsDE || '',
          FR: apiItem.strInstructionsFR || '',
          IT: apiItem.strInstructionsIT || ''
        };
    
        const mappedItem: Cocktail = {
          id: apiItem.idDrink,
          title: apiItem.strDrink,
          category: apiItem.strCategory,
          alcoholic: apiItem.strAlcoholic,
          glass: apiItem.strGlass,
          imageUrl: apiItem.strDrinkThumb,
          instructions,
          ingredients
        };
    
        return mappedItem;
      }
}

