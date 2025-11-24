/**
 * useApi Hook
 *
 * Generic hook for making API calls with loading and error states.
 */

import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '../services/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for making API calls with automatic loading and error handling
 *
 * @param apiCall - The API call function to execute
 * @param autoFetch - Whether to automatically fetch on mount (default: true)
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useApi(() => api.getDummyData());
 * ```
 */
export function useApi<T>(apiCall: () => Promise<T>, autoFetch: boolean = true): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiCall();
      setData(result);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
