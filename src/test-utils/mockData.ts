import { CityPreview, City, Category } from '@/src/types';

/**
 * Mock data for testing components.
 * Use these in your tests to avoid creating mock data repeatedly.
 */

export const mockCategory: Category = {
  id: 'cat-1',
  name: 'Culture',
  description: 'Cultural attractions and historical sites',
  code: 'CULTURE',
};

export const mockCategoryBeach: Category = {
  id: 'cat-2',
  name: 'Beach',
  description: 'Beautiful beaches and coastal areas',
  code: 'BEACH',
};

export const mockCityPreview: CityPreview = {
  id: 'city-1',
  name: 'Paris',
  country: 'France',
  coverImage: 12345, // require() returns a number in tests
};

export const mockCityPreviewBarcelona: CityPreview = {
  id: 'city-2',
  name: 'Barcelona',
  country: 'Spain',
  coverImage: 67890,
};

export const mockCity: City = {
  id: 'city-1',
  name: 'Paris',
  country: 'France',
  coverImage: 12345,
  description: 'Paris, the City of Light, is renowned for its art, fashion, gastronomy, and culture. Home to iconic landmarks like the Eiffel Tower and the Louvre.',
  touristAttractions: [
    {
      id: 'attr-1',
      name: 'Eiffel Tower',
      description: 'Iconic iron lattice tower',
      cityId: 'city-1',
    },
    {
      id: 'attr-2',
      name: 'Louvre Museum',
      description: 'World-famous art museum',
      cityId: 'city-1',
    },
  ],
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
  },
  categories: [mockCategory],
  relatedCitiesIds: ['city-2', 'city-3'],
};

export const mockCityBarcelona: City = {
  id: 'city-2',
  name: 'Barcelona',
  country: 'Spain',
  coverImage: 67890,
  description: 'Barcelona is known for its art and architecture, particularly the Sagrada Família and other works by Antoni Gaudí.',
  touristAttractions: [
    {
      id: 'attr-3',
      name: 'Sagrada Família',
      description: 'Unfinished basilica by Gaudí',
      cityId: 'city-2',
    },
  ],
  location: {
    latitude: 41.3851,
    longitude: 2.1734,
  },
  categories: [mockCategory, mockCategoryBeach],
  relatedCitiesIds: ['city-1'],
};

/**
 * Helper to create custom CityPreview mock data
 */
export const createMockCityPreview = (overrides: Partial<CityPreview> = {}): CityPreview => ({
  id: 'city-test',
  name: 'Test City',
  country: 'Test Country',
  coverImage: 99999,
  ...overrides,
});

/**
 * Helper to create custom City mock data
 */
export const createMockCity = (overrides: Partial<City> = {}): City => ({
  id: 'city-test',
  name: 'Test City',
  country: 'Test Country',
  coverImage: 99999,
  description: 'Test city description',
  touristAttractions: [],
  location: {
    latitude: 0,
    longitude: 0,
  },
  categories: [mockCategory],
  relatedCitiesIds: [],
  ...overrides,
});
