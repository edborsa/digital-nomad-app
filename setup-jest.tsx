// jest.setup.js

// Polyfills
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (obj: unknown) => JSON.parse(JSON.stringify(obj));
}

// Mock Expo modules that cause issues
(global as Record<string, unknown>).__ExpoImportMetaRegistry = {
  register: jest.fn(),
};

// Mock expo-vector-icons
jest.mock('@expo/vector-icons', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');
  function FakeIcon(props: { name: string }) {
    return <View testID={props.name} />;
  }

  return {
    Ionicons: FakeIcon,
    MaterialIcons: FakeIcon,
    FontAwesome: FakeIcon,
    Entypo: FakeIcon,
    AntDesign: FakeIcon,
  };
});

// Mock expo-font
jest.mock('expo-font', () => ({
  isLoaded: jest.fn(() => true),
  loadAsync: jest.fn(() => Promise.resolve()),
}));

// Mock expo-constants
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      name: 'digital-nomad-app',
      slug: 'digital-nomad-app',
    },
  },
}));

// Mock expo-linking
jest.mock('expo-linking', () => ({
  createURL: jest.fn(),
}));
