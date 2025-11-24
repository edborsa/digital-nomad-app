/**
 * Mock API Service
 *
 * In-memory implementation of API endpoints for testing.
 * Simulates API responses without making actual HTTP requests.
 */

import { DummyResponse } from '@services/api/endpoints';

/**
 * Mock data store
 */
const mockData = {
  dummyValue: 'bar',
};

/**
 * Simulated network delay (in ms)
 */
const MOCK_DELAY = 100;

/**
 * Helper to simulate async behavior
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock API Service
 *
 * Provides in-memory implementations of API endpoints
 */
export const mockApiService = {
  /**
   * Mock getDummyData endpoint
   * Returns: { data: { dummy_value: string } }
   */
  getDummyData: async (): Promise<DummyResponse> => {
    await delay(MOCK_DELAY);
    return {
      data: {
        dummy_value: mockData.dummyValue,
      },
    };
  },

  /**
   * Mock error response
   */
  getDummyDataError: async (): Promise<never> => {
    await delay(MOCK_DELAY);
    throw new Error('API Error: Failed to fetch dummy data');
  },

  /**
   * Reset mock data to defaults
   */
  reset: () => {
    mockData.dummyValue = 'bar';
  },

  /**
   * Set custom dummy value for testing
   */
  setDummyValue: (value: string) => {
    mockData.dummyValue = value;
  },
};
