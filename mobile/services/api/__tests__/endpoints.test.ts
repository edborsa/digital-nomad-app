/**
 * API Endpoints Tests
 *
 * Tests for API endpoints using mocked responses
 */

import { api } from '@services/api/endpoints';
import { mockApiService } from '@services/api/__mocks__/mockApiService';
import { setupMockFetchSuccess, clearMockFetch } from '@/__tests__/utils/mockFetch.helper';

describe('API Endpoints', () => {
  afterEach(() => {
    clearMockFetch();
    mockApiService.reset();
  });

  describe('getDummyData', () => {
    it('should fetch dummy data successfully', async () => {
      const mockData = { data: { dummy_value: 'bar' } };
      setupMockFetchSuccess(mockData);

      const result = await api.getDummyData();

      expect(result).toEqual(mockData);
      expect(result.data.dummy_value).toBe('bar');
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4583/api/dummy',
        expect.any(Object)
      );
    });

    it('should use mock service for testing', async () => {
      // Using in-memory mock service instead of fetch
      const result = await mockApiService.getDummyData();

      expect(result).toEqual({
        data: {
          dummy_value: 'bar',
        },
      });
    });

    it('should allow custom mock values', async () => {
      // Set custom value in mock service
      mockApiService.setDummyValue('custom_value');

      const result = await mockApiService.getDummyData();

      expect(result.data.dummy_value).toBe('custom_value');
    });

    it('should handle errors from mock service', async () => {
      await expect(mockApiService.getDummyDataError()).rejects.toThrow(
        'API Error: Failed to fetch dummy data'
      );
    });
  });
});
