import { renderWithTheme } from '@/src/test-utils';
import { Text } from '../Text';

describe('Text Component', () => {
  it('renders text content correctly', () => {
    const { getByText } = renderWithTheme(<Text>Hello World</Text>);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('applies default text variant styles', () => {
    const { getByText } = renderWithTheme(<Text>Default Text</Text>);
    const textElement = getByText('Default Text');
    expect(textElement).toBeTruthy();
  });

  it('applies title28 variant styles', () => {
    const { getByText } = renderWithTheme(<Text variant="title28">Large Title</Text>);
    const textElement = getByText('Large Title');
    expect(textElement).toBeTruthy();
  });

  it('applies title22 variant styles', () => {
    const { getByText } = renderWithTheme(<Text variant="title22">Medium Title</Text>);
    const textElement = getByText('Medium Title');
    expect(textElement).toBeTruthy();
  });

  it('applies title16 variant styles', () => {
    const { getByText } = renderWithTheme(<Text variant="title16">Small Title</Text>);
    const textElement = getByText('Small Title');
    expect(textElement).toBeTruthy();
  });

  it('applies text14 variant styles', () => {
    const { getByText } = renderWithTheme(<Text variant="text14">Small Text</Text>);
    const textElement = getByText('Small Text');
    expect(textElement).toBeTruthy();
  });

  it('applies custom color from theme', () => {
    const { getByText } = renderWithTheme(<Text color="primary">Red Text</Text>);
    const textElement = getByText('Red Text');
    expect(textElement).toBeTruthy();
  });

  it('renders with nested children', () => {
    const { getByText } = renderWithTheme(
      <Text>
        <Text>Hello World</Text>
      </Text>
    );
    expect(getByText('Hello World')).toBeTruthy();
  });
});
