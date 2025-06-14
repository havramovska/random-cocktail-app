import { RandomCocktailResponse, CocktailResponse } from './cocktail-response.model';

describe('API Response Models', () => {
  describe('CocktailResponse', () => {
    it('should create a valid cocktail response object', () => {
      const cocktailResponse: CocktailResponse = {
        idDrink: '12345',
        strDrink: 'Test Cocktail',
        strInstructions: 'Test instructions',
        strDrinkThumb: 'http://test.com/image.jpg',
        strCategory: 'Test Category',
        strAlcoholic: 'Alcoholic',
        strGlass: 'Test Glass'
      };

      expect(cocktailResponse).toBeDefined();
      expect(cocktailResponse.idDrink).toBe('12345');
      expect(cocktailResponse.strDrink).toBe('Test Cocktail');
      expect(cocktailResponse.strInstructions).toBe('Test instructions');
      expect(cocktailResponse.strDrinkThumb).toBe('http://test.com/image.jpg');
      expect(cocktailResponse.strCategory).toBe('Test Category');
      expect(cocktailResponse.strAlcoholic).toBe('Alcoholic');
      expect(cocktailResponse.strGlass).toBe('Test Glass');
    });

    it('should have all required properties', () => {
      const cocktailResponse: CocktailResponse = {
        idDrink: '12345',
        strDrink: 'Test Cocktail',
        strInstructions: 'Test instructions',
        strDrinkThumb: 'http://test.com/image.jpg',
        strCategory: 'Test Category',
        strAlcoholic: 'Alcoholic',
        strGlass: 'Test Glass'
      };

      expect(cocktailResponse).toHaveProperty('idDrink');
      expect(cocktailResponse).toHaveProperty('strDrink');
      expect(cocktailResponse).toHaveProperty('strInstructions');
      expect(cocktailResponse).toHaveProperty('strDrinkThumb');
      expect(cocktailResponse).toHaveProperty('strCategory');
      expect(cocktailResponse).toHaveProperty('strAlcoholic');
      expect(cocktailResponse).toHaveProperty('strGlass');
    });
  });

  describe('RandomCocktailResponse', () => {
    it('should create a valid random cocktail response object', () => {
      const randomResponse: RandomCocktailResponse = {
        drinks: [
          {
            idDrink: '12345',
            strDrink: 'Test Cocktail',
            strInstructions: 'Test instructions',
            strDrinkThumb: 'http://test.com/image.jpg',
            strCategory: 'Test Category',
            strAlcoholic: 'Alcoholic',
            strGlass: 'Test Glass'
          }
        ]
      };

      expect(randomResponse).toBeDefined();
      expect(randomResponse.drinks).toBeDefined();
      expect(randomResponse.drinks).toHaveLength(1);
      expect(randomResponse.drinks[0].idDrink).toBe('12345');
    });

    it('should have all required properties', () => {
      const randomResponse: RandomCocktailResponse = {
        drinks: []
      };

      expect(randomResponse).toHaveProperty('drinks');
    });

    it('should handle empty drinks array', () => {
      const randomResponse: RandomCocktailResponse = {
        drinks: []
      };

      expect(randomResponse.drinks).toHaveLength(0);
    });

    it('should handle multiple drinks', () => {
      const randomResponse: RandomCocktailResponse = {
        drinks: [
          {
            idDrink: '12345',
            strDrink: 'Test Cocktail 1',
            strInstructions: 'Test instructions 1',
            strDrinkThumb: 'http://test.com/image1.jpg',
            strCategory: 'Test Category',
            strAlcoholic: 'Alcoholic',
            strGlass: 'Test Glass'
          },
          {
            idDrink: '67890',
            strDrink: 'Test Cocktail 2',
            strInstructions: 'Test instructions 2',
            strDrinkThumb: 'http://test.com/image2.jpg',
            strCategory: 'Test Category',
            strAlcoholic: 'Alcoholic',
            strGlass: 'Test Glass'
          }
        ]
      };

      expect(randomResponse.drinks).toHaveLength(2);
      expect(randomResponse.drinks[0].idDrink).toBe('12345');
      expect(randomResponse.drinks[1].idDrink).toBe('67890');
    });
  });
}); 