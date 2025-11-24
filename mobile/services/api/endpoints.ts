/**
 * API Endpoints
 *
 * Type-safe API endpoint definitions with request/response types.
 */

import { apiClient } from './client';

/**
 * Response types
 */
export interface DummyResponse {
  data: {
    dummy_value: string;
  };
}

/**
 * API endpoints
 */
export const api = {
  /**
   * Get dummy data
   * GET /api/dummy
   */
  getDummyData: () => apiClient.get<DummyResponse>('/api/dummy'),
};
