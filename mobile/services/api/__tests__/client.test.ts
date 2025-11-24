/**
 * API Client Tests
 *
 * Tests for the API client with mocked fetch responses
 */

import { apiClient, ApiError } from '@services/api/client';
import {
  setupMockFetchSuccess,
  setupMockFetchError,
  setupMockFetchNetworkError,
  clearMockFetch,
} from '@/__tests__/utils/mockFetch.helper';

describe('apiClient', () => {
  afterEach(() => {
    clearMockFetch();
  });

  describe('GET requests', () => {
    it('should successfully fetch data', async () => {
      const mockData = { data: { dummy_value: 'bar' } };
      setupMockFetchSuccess(mockData);

      const result = await apiClient.get('/api/dummy');

      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4583/api/dummy',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('should handle query parameters', async () => {
      const mockData = { results: [] };
      setupMockFetchSuccess(mockData);

      await apiClient.get('/api/search', {
        params: { q: 'test', limit: '10' },
      });

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4583/api/search?q=test&limit=10',
        expect.any(Object)
      );
    });

    it('should throw ApiError on HTTP error', async () => {
      setupMockFetchError(404, 'Not Found');

      await expect(apiClient.get('/api/notfound')).rejects.toThrow(ApiError);
      await expect(apiClient.get('/api/notfound')).rejects.toThrow('Not Found');
    });

    it('should throw ApiError on network error', async () => {
      setupMockFetchNetworkError('Network request failed');

      await expect(apiClient.get('/api/dummy')).rejects.toThrow(ApiError);
      await expect(apiClient.get('/api/dummy')).rejects.toThrow('Network request failed');
    });
  });

  describe('POST requests', () => {
    it('should send POST request with body', async () => {
      const mockResponse = { success: true, id: '123' };
      const requestBody = { name: 'Test', value: 42 };
      setupMockFetchSuccess(mockResponse);

      const result = await apiClient.post('/api/create', requestBody);

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4583/api/create',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('should send POST request without body', async () => {
      const mockResponse = { success: true };
      setupMockFetchSuccess(mockResponse);

      await apiClient.post('/api/trigger');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4583/api/trigger',
        expect.objectContaining({
          method: 'POST',
          body: undefined,
        })
      );
    });
  });

  describe('PUT requests', () => {
    it('should send PUT request with body', async () => {
      const mockResponse = { success: true };
      const requestBody = { name: 'Updated' };
      setupMockFetchSuccess(mockResponse);

      const result = await apiClient.put('/api/update/123', requestBody);

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4583/api/update/123',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(requestBody),
        })
      );
    });
  });

  describe('PATCH requests', () => {
    it('should send PATCH request with body', async () => {
      const mockResponse = { success: true };
      const requestBody = { status: 'active' };
      setupMockFetchSuccess(mockResponse);

      const result = await apiClient.patch('/api/patch/123', requestBody);

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4583/api/patch/123',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(requestBody),
        })
      );
    });
  });

  describe('DELETE requests', () => {
    it('should send DELETE request', async () => {
      const mockResponse = { success: true };
      setupMockFetchSuccess(mockResponse);

      const result = await apiClient.delete('/api/delete/123');

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4583/api/delete/123',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });
  });

  describe('Error handling', () => {
    it('should create ApiError with status code', async () => {
      setupMockFetchError(500, 'Internal Server Error');

      try {
        await apiClient.get('/api/error');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).statusCode).toBe(500);
        expect((error as ApiError).message).toContain('Internal Server Error');
      }
    });

    it('should handle unknown errors', async () => {
      global.fetch = jest.fn(() => Promise.reject('Unknown error')) as jest.Mock;

      await expect(apiClient.get('/api/dummy')).rejects.toThrow(ApiError);
    });
  });
});
