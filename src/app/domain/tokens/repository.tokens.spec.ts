import { COCKTAILS_REPOSITORY } from './repository.tokens';
import { ICocktailRepository } from '../repositories/cocktail-repository.interface';
import { InjectionToken } from '@angular/core';

describe('Repository Tokens', () => {
  it('should define COCKTAILS_REPOSITORY token', () => {
    expect(COCKTAILS_REPOSITORY).toBeDefined();
  });

  it('should have correct token description', () => {
    expect(COCKTAILS_REPOSITORY.toString()).toContain('COCKTAILS_REPOSITORY');
  });

  it('should be typed as ICocktailRepository', () => {
    // This is a type check, so we'll use a type assertion to verify
    const token: InjectionToken<ICocktailRepository> = COCKTAILS_REPOSITORY;
    expect(token).toBeDefined();
  });
}); 