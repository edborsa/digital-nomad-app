// jest.setup.js

// Polyfills
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = obj => JSON.parse(JSON.stringify(obj));
}

// Mock Expo modules that cause issues
global.__ExpoImportMetaRegistry = {
  register: jest.fn(),
};

// Mock expo-vector-icons
jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  function FakeIcon(props) {
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

// Mock expo-router
jest.mock('expo-router', () => {
  const { View } = require('react-native');
  return {
    Link: ({ children, href, ...props }) => {
      return <View {...props}>{children}</View>;
    },
    useRouter: () => ({
      push: jest.fn(),
      back: jest.fn(),
      replace: jest.fn(),
      setParams: jest.fn(),
    }),
    useLocalSearchParams: () => ({}),
    usePathname: () => '/',
    useSegments: () => [],
    Stack: ({ children }) => children,
    Tabs: ({ children }) => children,
  };
});

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: View,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
  };
});

// Mock @expo/vector-icons/createIconSetFromIcoMoon (for custom IcoMoon icons)
jest.mock('@expo/vector-icons/createIconSetFromIcoMoon', () => {
  const { View } = require('react-native');
  return () => {
    return function MockIcoMoonIcon(props) {
      return <View testID={props.name} />;
    };
  };
});

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const { View } = require('react-native');
  return {
    GestureHandlerRootView: View,
    PanGestureHandler: View,
    TapGestureHandler: View,
    State: {},
    Directions: {},
  };
});
