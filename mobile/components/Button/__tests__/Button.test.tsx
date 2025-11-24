import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MyButton } from '@components/Button/Button';

describe('MyButton', () => {
  it('renders correctly with text', () => {
    const { getByText } = render(<MyButton text="Click me" onPress={() => {}} />);
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<MyButton text="Press me" onPress={onPressMock} />);

    fireEvent.press(getByText('Press me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
