# Digital Nomad App - Claude Context

This document provides context for AI assistants working on this project.

## Project Overview

A React Native mobile application built with Expo for digital nomads to explore cities and travel destinations.

## Tech Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **Styling**: @shopify/restyle (type-safe styling system)
- **Navigation**: expo-router (file-based routing)
- **Testing**: Jest with jest-expo preset
- **Linting**: ESLint with expo config
- **Formatting**: Prettier
- **Fonts**: Poppins font family (loaded via expo-font)
- **Icons**: IcoMoon custom icon set via @expo/vector-icons

## Project Structure

```
digital-nomad-app/
├── app/                          # Expo Router - file-based routing
│   ├── _layout.tsx              # Root layout with providers
│   ├── (protected)/             # Protected routes group
│   │   ├── (tabs)/              # Tab navigation
│   │   │   ├── _layout.tsx      # Tab bar configuration
│   │   │   ├── index.tsx        # Home screen (city list)
│   │   │   ├── explore.tsx      # Explore screen
│   │   │   └── profile.tsx      # Profile screen
│   │   └── city-details/[id].tsx # City detail screen
│   ├── sign-in.tsx              # Sign in screen
│   └── +not-found.tsx           # 404 page
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Box.tsx              # Base layout component (restyle)
│   │   ├── Text.tsx             # Base text component (restyle)
│   │   ├── Screen.tsx           # Screen wrapper with safe area
│   │   ├── Icon.tsx             # Custom icon component (IcoMoon)
│   │   ├── CityCard.tsx         # City preview card
│   │   ├── SearchInput.tsx      # Search input component
│   │   └── BlackOpacity.tsx     # Black overlay component
│   ├── containers/              # Container/smart components
│   │   └── CityFilter.tsx       # City search/filter container
│   ├── data/                    # Data layer
│   │   ├── cities.ts            # City data
│   │   ├── categories.ts        # Category data
│   │   ├── useCities.ts         # Cities data hook
│   │   ├── useCityDetails.ts    # City details hook
│   │   └── useRelatedCities.ts  # Related cities hook
│   ├── theme/                   # Theme configuration
│   │   ├── theme.ts             # Restyle theme definition
│   │   └── useAppTheme.ts       # Theme hook
│   ├── types.ts                 # TypeScript type definitions
│   └── __tests__/               # Test files
├── assets/
│   ├── fonts/                   # Poppins font family
│   └── icons/                   # IcoMoon icon font
├── types/                       # Global type declarations
│   └── assets.d.ts              # Asset module declarations
├── setup-jest.tsx               # Jest configuration
├── .prettierrc                  # Prettier config
├── eslint.config.js             # ESLint config
├── tsconfig.json                # TypeScript config
└── package.json                 # Dependencies and scripts

```

## Theme Configuration

Location: `src/theme/theme.ts`

### Colors

- `background`: #1B1B1B (Midnight Black)
- `primary`: #FF4B4B (Fiery Red)
- `text`: #FFFFFF (Pure White)
- `gray1`: #302E2D (Charcoal Grey)
- `gray2`: #5C5C5C (Stone Grey)

### Spacing

Spacing uses semantic names: `s2`, `s4`, `s8`, `s10`, `s12`, `s14`, `s16`, `s20`, `s24`, `s32`, `s40`, `s48`, `s56`, `padding` (16)

### Text Variants

- `title28`, `title22`, `title16`
- `text18`, `text16`, `text14`, `text12`
- Default font: PoppinsRegular

## Key Patterns & Conventions

### Component Styling

- Use `@shopify/restyle` for all styling
- Components extend from `Box` and `Text` base components
- Theme properties are type-safe

### Navigation

- File-based routing via expo-router
- Route groups use parentheses: `(tabs)`, `(protected)`
- Dynamic routes use brackets: `[id].tsx`

### State Management

- Currently using React hooks (useState, useRef, etc.)
- Custom data hooks in `src/data/`

### Icons

- Custom IcoMoon icon set loaded from `assets/icons/icomoon.ttf`
- Icon component provides type-safe icon names
- Available icons: Home, Explore, Person, Favorite, Search, etc.

### Safe Areas

- All screens wrapped in `SafeAreaProvider` (root layout)
- `Screen` component automatically handles safe area insets
- Uses `react-native-safe-area-context`

### Code Quality

- **Prop Sorting**: JSX props are automatically sorted alphabetically by ESLint
  - Reserved props (`key`, `ref`) come first
  - Callbacks (e.g., `onPress`, `onChange`) come last
  - Multiline props come last
  - Run `yarn lint:fix` to auto-sort props
- **Single Attribute Per Line**: Prettier enforces one prop per line (`singleAttributePerLine: true`)

## Scripts

```bash
# Development
yarn start                # Start Expo development server
yarn android              # Run on Android
yarn ios                  # Run on iOS
yarn web                  # Run on web

# Code Quality
yarn verify               # Run ALL checks (format, lint, type-check, test)
yarn lint                 # Run ESLint
yarn lint:fix             # Fix ESLint errors
yarn format               # Format code with Prettier
yarn format:check         # Check formatting
yarn type-check           # Run TypeScript compiler

# Testing
yarn test                 # Run Jest tests
yarn test:ci              # Run tests with verbose output
yarn test:watch           # Run tests in watch mode
```

## CI/CD

- EAS Build configured (`.eas/workflows/check-code.yml`)
- CI runs on pull requests:
  1. Prettier check
  2. ESLint
  3. TypeScript compilation
  4. Jest tests

## Important Notes

### Font Loading

- Fonts must be loaded before app renders
- Handled in `app/_layout.tsx` with `useFonts` hook
- Returns null until fonts are loaded

### Asset Imports

- Type declarations for fonts/images in `types/assets.d.ts`
- Restart TS server if LSP doesn't recognize assets

### Border Properties

- Use `borderTopWidth`, not `topBorderWidth`
- Follow React Native naming conventions

### Prettier Configuration

- Line width: 180 characters
- Single quotes: true
- Single attribute per line: true
- Trailing commas: ES5

## Types

### Key Types (src/types.ts)

```typescript
City - Full city object with all details
CityPreview - Pick<City, "id" | "name" | "country" | "coverImage">
Category - City category (Beach, Culture, etc.)
```

## Common Issues & Solutions

1. **Import errors after moving files**: Check import paths, use `@/` alias for root imports
2. **Theme property not found**: Ensure property exists in `src/theme/theme.ts`
3. **Font not loading**: Check font is loaded in `app/_layout.tsx` useFonts hook
4. **Safe area not working**: Ensure `SafeAreaProvider` wraps the app in root layout

## Dependencies

Key dependencies:

- `expo`: ~54.0.22
- `react`: 19.1.0
- `react-native`: 0.81.5
- `@shopify/restyle`: ^2.4.5
- `expo-router`: ~6.0.14
- `jest`: ^30.2.0
- `typescript`: ~5.9.2

## Testing Guide

### Test Infrastructure

Complete testing setup with:

- **Jest** (v30.2.0) with jest-expo preset
- **@testing-library/react-native** (v13.3.3) for component testing
- **Custom utilities** in `src/test-utils/`
- **Mock data** in `src/test-utils/mockData.ts`

### Writing Tests

#### Always Use `renderWithTheme`

All components use @shopify/restyle and require ThemeProvider:

```typescript
import { renderWithTheme } from '@/src/test-utils';
import { Text } from '../Text';

test('renders text', () => {
  const { getByText } = renderWithTheme(<Text>Hello</Text>);
  expect(getByText('Hello')).toBeTruthy();
});
```

#### Common Test Patterns

**1. Simple Restyle Components (Box, Text)**

```typescript
test('applies variant styles', () => {
  const { getByText } = renderWithTheme(<Text variant="title22">Title</Text>);
  expect(getByText('Title')).toBeTruthy();
});
```

**2. Stateful Components (SearchInput)**

```typescript
test('calls onChangeText', () => {
  const mockChange = jest.fn();
  const { getByPlaceholderText } = renderWithTheme(
    <SearchInput value="" onChangeText={mockChange} placeholder="Search" />
  );

  fireEvent.changeText(getByPlaceholderText('Search'), 'Paris');
  expect(mockChange).toHaveBeenCalledWith('Paris');
});
```

**3. Components with Icons**
Icons are mocked to return a View with testID={iconName}:

```typescript
test('shows search icon', () => {
  const { getByTestId } = renderWithTheme(<Icon name="Search-outline" />);
  expect(getByTestId('Search-outline')).toBeTruthy();
});
```

**4. Navigation Components (CityCard with Link)**
expo-router is mocked, Link renders as View:

```typescript
test('renders city info', () => {
  const { getByText } = renderWithTheme(<CityCard cityPreview={mockCity} />);
  expect(getByText('Paris')).toBeTruthy();
});
```

### Mock Data

Use provided mock data from `src/test-utils/mockData.ts`:

```typescript
import { mockCityPreview, mockCity, createMockCity } from '@/src/test-utils/mockData';

// Use predefined mocks
test('renders with mock data', () => {
  const { getByText } = renderWithTheme(<CityCard cityPreview={mockCityPreview} />);
  expect(getByText('Paris')).toBeTruthy();
});

// Create custom mocks
test('renders custom city', () => {
  const customCity = createMockCity({ name: 'Tokyo', country: 'Japan' });
  // ... test with customCity
});
```

### Mocked Dependencies

All external dependencies are mocked in `setup-jest.tsx`:

- ✅ `expo-router` (Link, useRouter, navigation hooks)
- ✅ `react-native-safe-area-context` (useSafeAreaInsets)
- ✅ `@expo/vector-icons` (Ionicons, MaterialIcons, etc.)
- ✅ `createIconSetFromIcoMoon` (Custom IcoMoon icons)
- ✅ `expo-font`, `expo-constants`, `expo-linking`
- ✅ `react-native-reanimated`, `react-native-gesture-handler`

### Test File Location

Place tests in `__tests__` folder next to components:

```
src/components/
├── Text.tsx
├── SearchInput.tsx
└── __tests__/
    ├── Text.test.tsx
    └── SearchInput.test.tsx
```

### Running Tests

```bash
yarn test              # Run all tests
yarn test:watch        # Watch mode
yarn test:ci           # Verbose output for CI
yarn test SearchInput  # Run specific test file
```

### Example Test Files

See these for complete examples:

- `src/components/__tests__/Text.test.tsx` - Simple component
- `src/components/__tests__/SearchInput.test.tsx` - Stateful component
- `src/components/__tests__/CityCard.test.tsx` - Complex component with navigation

## Development Workflow

1. Make changes to code
2. Write/update tests for changed components
3. Run `yarn verify` before committing
4. Fix any linting/type/test errors
5. Commit and push
6. CI will run checks on PR

---

**Last Updated**: 2025-11-08

Feel free to append additional context, decisions, or patterns as the project evolves.
