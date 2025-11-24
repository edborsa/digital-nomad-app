# Maestro E2E Tests

This directory contains Maestro end-to-end test flows for the Digital Nomad App.

## What is Maestro?

Maestro is a simple and effective mobile UI testing framework that allows you to write tests in YAML format.

## Installation

Install Maestro CLI:

```bash
# macOS/Linux
curl -Ls "https://get.maestro.mobile.dev" | bash

# Or with Homebrew
brew tap mobile-dev-inc/tap
brew install maestro
```

## Running Tests

### Prerequisites

1. **Start the backend API** (required for API tests):
   ```bash
   # Make sure your API is running at http://localhost:4583
   # The API should respond to GET /api/dummy
   ```

2. Build and install the app (first time only):
   ```bash
   # iOS
   npx expo run:ios

   # Android
   npx expo run:android
   ```

3. The app will be installed on the simulator with bundle ID `com.digitalnomad.app`

### Run Tests

```bash
# Run default tests (home + api-test)
maestro test .maestro/home.yml .maestro/api-test.yml

# Run all tests including optional storybook test
maestro test .maestro/

# Run a specific test flow
maestro test .maestro/home.yml
maestro test .maestro/api-test.yml
maestro test .maestro/storybook.yml  # Requires EXPO_PUBLIC_STORYBOOK_ENABLED=true
```

**Note**: The `storybook.yml` test requires Storybook to be enabled in `.env` and the app to be rebuilt. For normal testing, only run `home.yml` and `api-test.yml`.

## Test Flows

### `home.yml`
Tests the default home screen and basic API connectivity.

- Launches the app
- Asserts that "Hello World (storybook disabled)" is visible
- Verifies "API Test:" section is visible
- Waits for API call to complete
- Asserts that "✓ API Connected!" message appears

### `api-test.yml`
Comprehensive API integration test.

- Launches the app
- Verifies the home screen loads
- Waits for API call to complete (with 10s timeout)
- Asserts that "✓ API Connected!" message appears
- Verifies the dummy value from API: "Dummy Value: bar"
- Confirms API URL is displayed: "http://localhost:4583"

**Prerequisites**: Backend API must be running at `http://localhost:4583`

### `storybook.yml`
Tests the Storybook integration (OPTIONAL).

**Prerequisites**:
- Set `EXPO_PUBLIC_STORYBOOK_ENABLED=true` in `.env`
- Rebuild app: `npx expo run:ios`

Test steps:
- Launches the app
- Verifies we're NOT in normal app mode
- Asserts that "Open Storybook" link is visible
- Taps on the "Open Storybook" link
- Asserts that "MyButton" component is visible in Storybook

**Note**: This test is optional and typically skipped in CI/CD pipelines. Only run when testing Storybook functionality specifically.

## Writing New Tests

Create a new `.yml` file in the `.maestro/` directory following this structure:

```yaml
appId: com.digitalnomad.app
---
- launchApp
- assertVisible: "Text to find"
- tapOn: "Button text"
- inputText: "Text to input"
- scroll
# ... more commands
```

## Common Maestro Commands

- `launchApp` - Launches the app
- `assertVisible: "text"` - Checks if text is visible on screen
- `assertVisible: { text: "text", timeout: 10000 }` - Checks with custom timeout (in ms)
- `assertNotVisible: "text"` - Checks if text is not visible
- `tapOn: "text"` - Taps on element with text
- `inputText: "text"` - Inputs text into focused field
- `scroll` - Scrolls down
- `scrollUntilVisible: "text"` - Scrolls until text is visible
- `swipe` - Performs swipe gesture
- `pressKey: Enter` - Presses a key

## Testing API Integration

The Maestro tests verify that the app successfully connects to the backend API. Here's what's being tested:

1. **API Connection**: Tests wait for the async API call to complete
2. **Loading States**: Verifies loading indicators appear and disappear
3. **Success States**: Confirms success messages and data display
4. **Data Accuracy**: Validates the actual API response data is shown
5. **Configuration**: Checks the correct API URL is being used

**Important**: Make sure your backend API is running at `http://localhost:4583` before running the API tests.

## Resources

- [Maestro Documentation](https://maestro.mobile.dev)
- [Maestro Cloud](https://console.mobile.dev)
- [Example Flows](https://github.com/mobile-dev-inc/maestro/tree/main/maestro-test)
