import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Cocktail } from '../../../domain/models/cocktail.model';
import { RandomCocktailResponse } from './model/cocktail-response.model';
import { ApiToDomainDataMapper } from '@app/data/mappers/api-to-domain-mapper';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CocktailApiService {
  private readonly apiUrl = environment.cocktailApiUrl;

  constructor(private http: HttpClient) {}

  getRandomCocktail(): Observable<Cocktail> {
    return this.http.get<RandomCocktailResponse>(this.apiUrl).pipe(
      map(response => {
        if (!response.drinks || response.drinks.length === 0) {
          throw new Error('No drinks found in the response');
        }
        return ApiToDomainDataMapper.mapApiItemToItem(response.drinks[0]);
      }),
      catchError(error => {
        console.error('Error fetching cocktail:', error);
        return throwError(() => new Error('Failed to fetch cocktail: ' + error.message));
      })
    );
  }
} 