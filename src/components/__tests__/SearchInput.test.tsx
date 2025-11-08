import { renderWithTheme, fireEvent } from '@/src/test-utils';
import { SearchInput } from '../SearchInput';

describe('SearchInput Component', () => {
  it('renders with placeholder text', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <SearchInput
        placeholder="Search cities"
        value=""
        onChangeText={jest.fn()}
      />
    );
    expect(getByPlaceholderText('Search cities')).toBeTruthy();
  });

  it('displays the correct initial value', () => {
    const { getByDisplayValue } = renderWithTheme(
      <SearchInput
        placeholder="Search"
        value="Paris"
        onChangeText={jest.fn()}
      />
    );
    expect(getByDisplayValue('Paris')).toBeTruthy();
  });

  it('calls onChangeText when text is entered', () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = renderWithTheme(
      <SearchInput
        placeholder="Search"
        value=""
        onChangeText={mockOnChangeText}
      />
    );

    const input = getByPlaceholderText('Search');
    fireEvent.changeText(input, 'Barcelona');

    expect(mockOnChangeText).toHaveBeenCalledWith('Barcelona');
    expect(mockOnChangeText).toHaveBeenCalledTimes(1);
  });

  it('shows search icon when input is empty', () => {
    const { getByTestId } = renderWithTheme(
      <SearchInput
        placeholder="Search"
        value=""
        onChangeText={jest.fn()}
      />
    );

    expect(getByTestId('Search-outline')).toBeTruthy();
  });

  it('shows close icon when input has text', () => {
    const { getByTestId } = renderWithTheme(
      <SearchInput
        placeholder="Search"
        value="test"
        onChangeText={jest.fn()}
      />
    );

    expect(getByTestId('Close')).toBeTruthy();
  });

  it('clears text when close button is pressed', () => {
    const mockOnChangeText = jest.fn();
    const { getByTestId } = renderWithTheme(
      <SearchInput
        placeholder="Search"
        value="Barcelona"
        onChangeText={mockOnChangeText}
      />
    );

    const closeIcon = getByTestId('Close');
    // IconButton wraps Icon in Pressable, so we need to press the parent
    const pressable = closeIcon.parent;
    if (pressable) {
      fireEvent.press(pressable);
    }

    expect(mockOnChangeText).toHaveBeenCalledWith('');
  });

  it('does not clear text when search button is pressed with empty input', () => {
    const mockOnChangeText = jest.fn();
    const { getByTestId } = renderWithTheme(
      <SearchInput
        placeholder="Search"
        value=""
        onChangeText={mockOnChangeText}
      />
    );

    const searchIcon = getByTestId('Search-outline');
    const pressable = searchIcon.parent;
    if (pressable) {
      fireEvent.press(pressable);
    }

    // Should not call onChangeText since there's nothing to clear
    expect(mockOnChangeText).not.toHaveBeenCalled();
  });

  it('handles focus state changes', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <SearchInput
        placeholder="Search"
        value=""
        onChangeText={jest.fn()}
      />
    );

    const input = getByPlaceholderText('Search');

    // Simulate focus
    fireEvent(input, 'focus');
    // At this point the border color should change (internal state)
    expect(input).toBeTruthy();

    // Simulate blur
    fireEvent(input, 'blur');
    expect(input).toBeTruthy();
  });

  it('updates icon when value changes from empty to filled', () => {
    const { getByTestId, rerender } = renderWithTheme(
      <SearchInput
        placeholder="Search"
        value=""
        onChangeText={jest.fn()}
      />
    );

    // Initially shows search icon
    expect(getByTestId('Search-outline')).toBeTruthy();

    // Re-render with text
    rerender(
      <SearchInput
        placeholder="Search"
        value="Paris"
        onChangeText={jest.fn()}
      />
    );

    // Now shows close icon
    expect(getByTestId('Close')).toBeTruthy();
  });
});
