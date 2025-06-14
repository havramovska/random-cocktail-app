import { appConfig } from './app.config';
import { COCKTAILS_REPOSITORY } from './domain/tokens/repository.tokens';
import { CocktailItemRepository } from './data/repositories/cocktail.repository';
import { cocktailsReducer } from './data/state/cocktail-state/cocktail.reducer';

describe('appConfig', () => {
  it('should provide the CocktailItemRepository for COCKTAILS_REPOSITORY token', () => {
    const provider = appConfig.providers.find(
      p => typeof p === 'object' && 'provide' in p && p.provide === COCKTAILS_REPOSITORY
    );

    expect(provider).toBeTruthy();
    expect((provider as any).useClass).toBe(CocktailItemRepository);
  });

  it('should include store provider with cocktails reducer', () => {
    const storeProvider = appConfig.providers.find(
      (p: any) => typeof p === 'object' &&
        Array.isArray(p?.ɵproviders) &&
        p.ɵproviders.some((prov: any) =>
          prov.useValue?.cocktails === cocktailsReducer
        )
    );

    expect(storeProvider).toBeTruthy();
  });
});
