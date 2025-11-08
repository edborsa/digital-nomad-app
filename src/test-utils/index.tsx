import { render, RenderOptions } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import theme from '@/src/theme/theme';
import { ReactElement } from 'react';

/**
 * Custom render function that includes ThemeProvider wrapper.
 * Use this instead of the default render() from @testing-library/react-native
 * for any component that uses restyle theme (Box, Text, or components that use them).
 *
 * @example
 * import { renderWithTheme } from '@/src/test-utils';
 *
 * test('renders correctly', () => {
 *   const { getByText } = renderWithTheme(<MyComponent />);
 *   expect(getByText('Hello')).toBeTruthy();
 * });
 */
export function renderWithTheme(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

// Re-export everything from testing library for convenience
export * from '@testing-library/react-native';
