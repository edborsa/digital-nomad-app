/**
 * useApi Hook Tests
 *
 * Tests for the useApi hook with mocked API calls
 */

import { renderHook, waitFor } from '@testing-library/react-native';
import { useApi } from '@hooks/useApi';
import { mockApiService } from '@services/api/__mocks__/mockApiService';

describe('useApi', () => {
  beforeEach(() => {
    mockApiService.reset();
  });

  it('should fetch data on mount by default', async () => {
    const { result } = renderHook(() => useApi(() => mockApiService.getDummyData()));

    // Initially loading
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Data should be loaded
    expect(result.current.data).toEqual({
      data: { dummy_value: 'bar' },
    });
    expect(result.current.error).toBeNull();
  });

  it('should not fetch on mount when autoFetch is false', async () => {
    const { result } = renderHook(() => useApi(() => mockApiService.getDummyData(), false));

    // Should not be loading
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // Manually trigger fetch
    await result.current.refetch();

    await waitFor(() => {
      expect(result.current.data).not.toBeNull();
    });

    expect(result.current.data).toEqual({
      data: { dummy_value: 'bar' },
    });
  });

  it('should handle errors', async () => {
    const { result } = renderHook(() => useApi(() => mockApiService.getDummyDataError()));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('API Error: Failed to fetch dummy data');
    expect(result.current.data).toBeNull();
  });

  it('should refetch data when refetch is called', async () => {
    const { result } = renderHook(() => useApi(() => mockApiService.getDummyData()));

    // Wait for initial fetch
    await waitFor(() => {
      expect(result.current.data).not.toBeNull();
    });

    expect(result.current.data?.data.dummy_value).toBe('bar');

    // Change mock data
    mockApiService.setDummyValue('new_value');

    // Refetch
    await result.current.refetch();

    await waitFor(() => {
      expect(result.current.data?.data.dummy_value).toBe('new_value');
    });
  });

  it('should clear error on successful refetch', async () => {
    // Start with error
    const { result, rerender } = renderHook(
      ({ shouldError }: { shouldError: boolean }) =>
        useApi(() =>
          shouldError ? mockApiService.getDummyDataError() : mockApiService.getDummyData()
        ),
      { initialProps: { shouldError: true } }
    );

    // Wait for error
    await waitFor(() => {
      expect(result.current.error).not.toBeNull();
    });

    expect(result.current.error).toBeTruthy();

    // Change to success and refetch
    rerender({ shouldError: false });
    await result.current.refetch();

    await waitFor(() => {
      expect(result.current.error).toBeNull();
    });

    expect(result.current.data).not.toBeNull();
  });

  it('should handle custom mock values', async () => {
    mockApiService.setDummyValue('custom_test_value');

    const { result } = renderHook(() => useApi(() => mockApiService.getDummyData()));

    await waitFor(() => {
      expect(result.current.data).not.toBeNull();
    });

    expect(result.current.data?.data.dummy_value).toBe('custom_test_value');
  });
});
