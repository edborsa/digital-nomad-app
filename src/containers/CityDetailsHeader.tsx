import { ImageBackground } from 'react-native';
import { Box } from '../components/Box';
import { City } from '../types';
import { IconButton } from '../components/IconButton';
import { router } from 'expo-router';
import { Icon } from '../components/Icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type CityDetailsHeaderProps = Pick<City, 'id' | 'coverImage' | 'categories'>;

export default function CityDetailsHeader({ id, coverImage, categories }: CityDetailsHeaderProps) {
  const { top } = useSafeAreaInsets();
  return (
    <Box>
      <ImageBackground
        imageStyle={{ borderBottomRightRadius: 40 }}
        source={coverImage}
        style={{ width: '100%', height: 250 }}
      >
        <Box
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
          padding="padding"
          style={{ paddingTop: top }}
        >
          <IconButton
            iconName="Chevron-left"
            onPress={router.back}
          />
          <Icon
            color="pureWhite"
            name="Favorite-outline"
            size={30}
          />
        </Box>
      </ImageBackground>
    </Box>
  );
}
