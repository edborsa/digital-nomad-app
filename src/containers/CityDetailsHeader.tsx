import { router } from 'expo-router';
import { ImageBackground, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlackOpacity } from '../components/BlackOpacity';
import { Box } from '../components/Box';
import { CategoryPill } from '../components/CategoryPill';
import { Icon } from '../components/Icon';
import { IconButton } from '../components/IconButton';
import { City } from '../types';
import { PILL_HEIGHT } from '../components/Pill';

type CityDetailsHeaderProps = Pick<City, 'id' | 'coverImage' | 'categories'>;

export function CityDetailsHeader({ coverImage, categories }: CityDetailsHeaderProps) {
  const { top } = useSafeAreaInsets();
  return (
    <Box>
      <ImageBackground
        imageStyle={{ borderBottomRightRadius: 40 }}
        source={coverImage}
        style={{ width: '100%', height: 250 }}
      >
        <BlackOpacity />
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

      <ScrollView
        bounces={false}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: -PILL_HEIGHT / 2 }}
      >
        <Box
          flexDirection="row"
          gap="s8"
          paddingHorizontal="padding"
        >
          {categories.map((category) => (
            <CategoryPill
              key={category.id}
              active={true}
              category={category}
            />
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
}
