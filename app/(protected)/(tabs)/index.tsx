import { Box } from '@/src/components/Box';
import { CityCard } from '@/src/components/CityCard';
import { Screen } from '@/src/components/Screen';
import { CityFilter } from '@/src/containers/CityFilter';
import { categories } from '@/src/data/categories';
import { useCities } from '@/src/data/useCities';
import { useDebounce } from '@/src/hooks/useDebounce';
import { useAppTheme } from '@/src/theme/useAppTheme';
import { CityPreview } from '@/src/types';
import { useScrollToTop } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { spacing } = useAppTheme();
  const { top } = useSafeAreaInsets();
  const [cityName, setCityName] = useState('');

  const debouncedCityName = useDebounce(cityName);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const { cityPreviewList } = useCities({
    name: debouncedCityName,
    categoryId: selectedCategoryId,
  });

  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  function renderItem({ item }: ListRenderItemInfo<CityPreview>) {
    return (
      <Box paddingHorizontal="padding">
        <CityCard cityPreview={item} />
      </Box>
    );
  }

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <FlatList
        ref={flatListRef}
        data={cityPreviewList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: spacing.padding,
          paddingTop: top,
          paddingBottom: spacing.padding,
        }}
        ListHeaderComponent={
          <CityFilter
            categories={categories}
            cityName={cityName}
            selectedCategoryId={selectedCategoryId}
            onChangeCityName={setCityName}
            onChangeSelectedCategoryId={setSelectedCategoryId}
          />
        }
      />
    </Screen>
  );
}
