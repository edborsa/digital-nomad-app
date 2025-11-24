/**
 * Mock Fetch Utilities
 *
 * Helper functions for mocking fetch API in tests
 */

/**
 * Mock fetch response
 */
export const mockFetchResponse = (data: unknown, status = 200) => {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
    statusText: status === 200 ? 'OK' : 'Error',
  } as Response);
};

/**
 * Mock fetch error
 */
export const mockFetchError = (message: string) => {
  return Promise.reject(new Error(message));
};

/**
 * Setup fetch mock for success
 */
export const setupMockFetchSuccess = (data: unknown) => {
  global.fetch = jest.fn(() => mockFetchResponse(data)) as jest.Mock;
};

/**
 * Setup fetch mock for error
 */
export const setupMockFetchError = (status: number, message: string) => {
  global.fetch = jest.fn(() => mockFetchResponse({ message }, status)) as jest.Mock;
};

/**
 * Setup fetch mock for network error
 */
export const setupMockFetchNetworkError = (message: string) => {
  global.fetch = jest.fn(() => mockFetchError(message)) as jest.Mock;
};

/**
 * Clear all fetch mocks
 */
export const clearMockFetch = () => {
  if (global.fetch && jest.isMockFunction(global.fetch)) {
    (global.fetch as jest.Mock).mockClear();
  }
};
