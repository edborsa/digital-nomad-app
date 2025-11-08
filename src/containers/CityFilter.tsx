import { ScrollView } from 'react-native';
import { Box } from '../components/Box';
import { CategoryPill } from '../components/CategoryPill';
import { SearchInput } from '../components/SearchInput';
import { Category } from '../types';

type CityFilterProps = {
  categories: Category[];
  cityName: string;
  onChangeCityName: (cityName: string) => void;
  selectedCategoryId: string | null;
  onChangeSelectedCategoryId: (id: string | null) => void;
};
export function CityFilter({ categories, cityName, onChangeCityName, selectedCategoryId, onChangeSelectedCategoryId }: CityFilterProps) {
  return (
    <Box>
      <Box paddingHorizontal="padding">
        <SearchInput
          placeholder="Qual seu próximo destino?"
          value={cityName}
          onChangeText={onChangeCityName}
        />
      </Box>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Box
          flexDirection="row"
          gap="s8"
          mt="s16"
          paddingHorizontal="padding"
        >
          {categories.map((category) => (
            <CategoryPill
              key={category.id}
              active={category.id === selectedCategoryId}
              category={category}
              onPress={() => onChangeSelectedCategoryId(category.id === selectedCategoryId ? null : category.id)}
            />
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
}
