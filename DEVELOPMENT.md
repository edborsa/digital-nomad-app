# Development Guide

This guide covers how to run the application, Storybook, tests, and E2E tests for the Digital Nomad App.

## Prerequisites

- Node.js (v25.1.0 or compatible)
- Yarn package manager
- iOS Simulator (via Xcode)
- Java (for Maestro E2E tests)

## Running the Application

### Normal Application Mode

To run the app without Storybook:

```bash
# Start the Expo dev server
yarn start

# Or directly open in iOS simulator
yarn ios

# Or directly open in Android emulator
yarn android
```

The app will show: "Hello World (storybook disabled)"

### Clean Start (Clear Cache)

If you encounter issues or need a fresh start:

```bash
npx expo start --clear
```

## Running Storybook

Storybook allows you to develop and test UI components in isolation.

### Storybook Web (Browser)

Best for rapid prototyping and documentation:

```bash
yarn storybook:web
```

Then open http://localhost:6006/ in your browser.

**Features:**

- Fast hot reload
- Desktop-style UI with sidebar and controls panel
- Component documentation
- Visual testing

### Storybook iOS (Native)

Runs Storybook inside your iOS app for testing native behavior:

```bash
yarn storybook:ios
```

This will:

1. Set `EXPO_PUBLIC_STORYBOOK_ENABLED='true'` environment variable
2. Launch the iOS simulator
3. Show Storybook UI inside the native app

**Features:**

- True native iOS rendering
- On-device controls and addons
- Test iOS-specific behaviors (gestures, animations)
- Platform-specific code testing

### Storybook Android (Native)

```bash
yarn storybook:android
```

Same as iOS but for Android emulator.

## Running Jest Tests

Jest is configured for unit and integration testing of React Native components.

### Run All Tests

```bash
yarn test
```

### Watch Mode

Auto-runs tests when files change:

```bash
yarn test:watch
```

### Coverage Report

```bash
yarn test:coverage
```

Coverage reports are generated in the `coverage/` directory.

### Writing Tests

Tests should be placed in `__tests__/` directories next to components:

```
components/
  Button/
    Button.tsx
    Button.stories.tsx
    __tests__/
      Button.test.tsx
```

Example test:

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { MyButton } from '../Button';

describe('MyButton', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MyButton text="Click me" onPress={() => {}} />);
    expect(getByText('Click me')).toBeTruthy();
  });
});
```

## Running Maestro E2E Tests

Maestro provides end-to-end testing on iOS simulators/devices.

### Prerequisites

1. **Install Maestro** (already installed at `~/.maestro/bin/maestro`)
2. **Install Java** (required by Maestro):
   ```bash
   # Using asdf
   asdf plugin add java
   asdf install java temurin-21.0.9+10.0.LTS
   asdf local java temurin-21.0.9+10.0.LTS
   ```

### Build the App for Testing

Before running Maestro tests, you need a native build:

```bash
npx expo run:ios
```

This builds and installs the app on the iOS simulator with bundle ID: `com.dadinho94.digital-nomad-app`

**Note:** This step takes 3-5 minutes on first build.

### Run Maestro Tests

Once the app is built and installed:

```bash
# Run individual test flows
maestro test .maestro/home.yml
maestro test .maestro/storybook.yml

# Run all tests in the .maestro directory
maestro test .maestro/
```

### Available Test Flows

1. **home.yml** - Tests the normal app mode
   - Launches the app
   - Verifies "Hello World (storybook disabled)" is visible

2. **storybook.yml** - Tests Storybook mode
   - Launches the app with Storybook enabled
   - Taps "Open Storybook" link
   - Verifies MyButton component is visible

### Creating New Maestro Tests

Create `.yml` files in the `.maestro/` directory:

```yaml
appId: com.dadinho94.digital-nomad-app
---
- launchApp
- assertVisible: 'Some text'
- tapOn: 'Button text'
- assertVisible: 'Expected result'
```

See [Maestro documentation](https://maestro.mobile.dev/) for more commands.

### Running Tests on EAS (CI/CD)

The app is configured to run E2E tests automatically on pull requests via EAS Workflows:

```bash
# Manually trigger the workflow
npx eas-cli@latest workflow:run .eas/workflows/e2e-test-ios.yml
```

## Linting

### Check for Issues

```bash
yarn lint
```

### Auto-fix Issues

```bash
yarn lint:fix
```

## Troubleshooting

### Metro Bundler Cache Issues

If you see stale content or Storybook when it shouldn't be:

```bash
rm -rf .expo node_modules/.cache
npx expo start --clear
```

### Watchman Warning

If you see "Recrawled this watch" warning:

```bash
watchman watch-del '/path/to/digital-nomad-app'
watchman watch-project '/path/to/digital-nomad-app'
```

### Jest Tests Failing

Make sure all mocks are properly configured in `jest.setup.js`. The setup file includes comprehensive mocks for:

- Expo modules (expo-router, expo-constants, expo-linking, etc.)
- React Native Reanimated
- React Native Gesture Handler
- React Native Safe Area Context
- Vector Icons

### Maestro Can't Find App

Ensure:

1. The app is built with `npx expo run:ios`
2. The bundle ID in `.maestro/*.yml` matches your app: `com.dadinho94.digital-nomad-app`
3. The iOS simulator is running

## Project Structure

```
digital-nomad-app/
├── app/                    # Expo Router pages
│   ├── (pages)/           # Normal app pages
│   └── (storybook)/       # Storybook integration
├── components/            # React components
│   └── Button/
│       ├── Button.tsx
│       ├── Button.stories.tsx
│       └── __tests__/
├── .maestro/             # E2E test flows
│   ├── home.yml
│   └── storybook.yml
├── .eas/                 # EAS Workflows
│   └── workflows/
│       └── e2e-test-ios.yml
├── .storybook/           # Storybook web config
├── .rnstorybook/         # Storybook native config
├── jest.config.js        # Jest configuration
├── jest.setup.js         # Jest mocks and setup
├── eas.json              # EAS Build profiles
└── package.json          # Dependencies and scripts
```

## Quick Reference

| Task                | Command                    |
| ------------------- | -------------------------- |
| Start app           | `yarn start` or `yarn ios` |
| Run Storybook (web) | `yarn storybook:web`       |
| Run Storybook (iOS) | `yarn storybook:ios`       |
| Run tests           | `yarn test`                |
| Run tests (watch)   | `yarn test:watch`          |
| Test coverage       | `yarn test:coverage`       |
| Lint code           | `yarn lint`                |
| Build for iOS       | `npx expo run:ios`         |
| Run E2E tests       | `maestro test .maestro/`   |
| Clear cache         | `npx expo start --clear`   |
