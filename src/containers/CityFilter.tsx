import { useState } from 'react';
import { Box } from '../components/Box';
import { SearchInput } from '../components/SearchInput';
import { Pill } from '../components/Pill';

export function CityFilter() {
  const [name, setName] = useState('');
  return (
    <Box>
      <SearchInput
        placeholder="Qual o seu destino?"
        value={name}
        onChangeText={setName}
      />
      <Pill
        active={false}
        iconName="Beach"
        label="Praia"
        onPress={() => {}}
      />
    </Box>
  );
}
