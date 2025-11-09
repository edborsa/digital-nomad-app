import { Screen } from '@/src/components/Screen';
import { Text } from '@/src/components/Text';
import CityDetailsHeader from '@/src/containers/CityDetailsHeader';
import CityDetailsInfo from '@/src/containers/CityDetailsInfo';
import CityDetailsMap from '@/src/containers/CityDetailsMap';
import CityDetailsRelatedCities from '@/src/containers/CityDetailsRelatedCities';
import CityDetailsTouristicAttractions from '@/src/containers/CityDetailsTouristicAttractions';
import { useCityDetails } from '@/src/data/useCityDetails';
import { useLocalSearchParams } from 'expo-router';

export default function CityDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const city = useCityDetails(id);

  if (!city) {
    return (
      <Screen
        alignItems="center"
        flex={1}
        justifyContent="center"
      >
        <Text>City not found</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <CityDetailsHeader
        categories={city?.categories || []}
        coverImage={city?.coverImage}
        id={city?.id}
      />
      <CityDetailsInfo />
      <CityDetailsTouristicAttractions />
      <CityDetailsMap />
      <CityDetailsRelatedCities />
    </Screen>
  );
}
