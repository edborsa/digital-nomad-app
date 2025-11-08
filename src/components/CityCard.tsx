import { ImageBackground, ImageBackgroundProps, Pressable } from 'react-native';

import { Link } from 'expo-router';
import { BlackOpacity } from './BlackOpacity';
import { Box } from './Box';
import { Icon } from './Icon';
import { Text } from './Text';
import { useAppTheme } from '@/src/theme/useAppTheme';
import { CityPreview } from '@/src/types';

type CityCardProps = {
  cityPreview: CityPreview;
  style?: ImageBackgroundProps['style'];
};

export function CityCard({ cityPreview, style }: CityCardProps) {
  const { borderRadii } = useAppTheme();
  return (
    <Link
      asChild
      href={`/city-details/${cityPreview.id}`}
      push
    >
      <Pressable>
        <ImageBackground
          imageStyle={{ borderRadius: borderRadii.default }}
          source={cityPreview.coverImage}
          style={[{ width: '100%', height: 280 }, style]}
        >
          <BlackOpacity />
          <Box
            flex={1}
            justifyContent="space-between"
            padding="s24"
          >
            <Box alignSelf="flex-end">
              <Icon
                color="text"
                name="Favorite-outline"
              />
            </Box>

            <Box>
              <Text variant="title22">{cityPreview.name}</Text>
              <Text variant="text16">{cityPreview.country}</Text>
            </Box>
          </Box>
        </ImageBackground>
      </Pressable>
    </Link>
  );
}
