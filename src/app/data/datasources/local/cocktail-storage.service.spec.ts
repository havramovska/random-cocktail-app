import { TestBed } from '@angular/core/testing';
import { CocktailStorageService } from './cocktail-storage.service';
import { StorageService } from './storage.service';
import { Cocktail } from '@app/domain/models/cocktail.model';
import { STORAGE_KEYS } from './storage.constants';

describe('CocktailStorageService', () => {
  let service: CocktailStorageService;
  let storageService: jest.Mocked<StorageService>;

  const mockCocktail: Cocktail = {
    id: '12345',
    title: 'Test Cocktail',
    category: 'Test Category',
    alcoholic: 'Alcoholic',
    glass: 'Test Glass',
    imageUrl: 'http://test.com/image.jpg',
    instructions: {
      EN: 'Test instructions',
      ES: '',
      DE: '',
      FR: '',
      IT: ''
    },
    ingredients: [
      { ingredient: 'Ingredient 1', measure: '1 oz' }
    ]
  };

  const mockCocktails: Cocktail[] = [
    mockCocktail,
    {
      ...mockCocktail,
      id: '67890',
      title: 'Another Test Cocktail'
    }
  ];

  beforeEach(() => {
    storageService = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      hasValidItem: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      providers: [
        CocktailStorageService,
        { provide: StorageService, useValue: storageService }
      ]
    });
    service = TestBed.inject(CocktailStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get stored cocktails', () => {
    storageService.getItem.mockReturnValue(mockCocktails);
    const result = service.getStoredCocktails();
    expect(result).toEqual(mockCocktails);
    expect(storageService.getItem).toHaveBeenCalledWith(STORAGE_KEYS.RANDOM_COCKTAILS);
  });

  it('should return empty array when no cocktails are stored', () => {
    storageService.getItem.mockReturnValue(null);
    const result = service.getStoredCocktails();
    expect(result).toEqual([]);
  });

  it('should store a new cocktail', () => {
    storageService.getItem.mockReturnValue([]);
    service.storeCocktail(mockCocktail);
    expect(storageService.setItem).toHaveBeenCalledWith(STORAGE_KEYS.RANDOM_COCKTAILS, [mockCocktail]);
  });

  it('should not store duplicate cocktails', () => {
    storageService.getItem.mockReturnValue([mockCocktail]);
    service.storeCocktail(mockCocktail);
    expect(storageService.setItem).not.toHaveBeenCalled();
  });

  it('should get a random stored cocktail', () => {
    storageService.getItem.mockReturnValue(mockCocktails);
    const result = service.getRandomStoredCocktail([]);
    expect(result).toBeDefined();
    expect(mockCocktails).toContain(result);
  });

  it('should return null when no cocktails are available', () => {
    storageService.getItem.mockReturnValue([]);
    const result = service.getRandomStoredCocktail([]);
    expect(result).toBeNull();
  });

  it('should exclude specified cocktail IDs when getting random cocktail', () => {
    storageService.getItem.mockReturnValue(mockCocktails);
    const result = service.getRandomStoredCocktail(['12345']);
    expect(result).toBeDefined();
    expect(result?.id).toBe('67890');
  });
}); 