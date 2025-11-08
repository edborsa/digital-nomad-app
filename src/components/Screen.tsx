import { PropsWithChildren } from 'react';
import { ScrollView, View } from 'react-native';
import { Box, BoxProps } from './Box';

export function Screen({ children, scrollable = false, ...boxProps }: PropsWithChildren & BoxProps & { scrollable?: boolean }) {
  const Container = scrollable ? ScrollView : View;

  return (
    <Box
      backgroundColor="background"
      flex={1}
      paddingHorizontal="padding"
      {...boxProps}
    >
      <Container>{children}</Container>
    </Box>
  );
}
