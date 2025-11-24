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

1. Start your Expo app in development mode:
   ```bash
   yarn start
   ```

2. Open the app in iOS Simulator or Android Emulator:
   ```bash
   # iOS
   yarn ios

   # Android
   yarn android
   ```

### Run All Tests

```bash
# Run all test flows
maestro test .maestro/

# Run a specific test flow
maestro test .maestro/home.yml
maestro test .maestro/storybook.yml
```

## Test Flows

### `home.yml`
Tests the default home screen when Storybook is disabled.

- Launches the app
- Asserts that "Hello World (storybook disabled)" is visible

### `storybook.yml`
Tests the Storybook integration.

- Launches the app
- Asserts that "Open Storybook" link is visible
- Taps on the "Open Storybook" link
- Asserts that "MyButton" component is visible in Storybook

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
- `assertNotVisible: "text"` - Checks if text is not visible
- `tapOn: "text"` - Taps on element with text
- `inputText: "text"` - Inputs text into focused field
- `scroll` - Scrolls down
- `scrollUntilVisible: "text"` - Scrolls until text is visible
- `swipe` - Performs swipe gesture
- `pressKey: Enter` - Presses a key

## Resources

- [Maestro Documentation](https://maestro.mobile.dev)
- [Maestro Cloud](https://console.mobile.dev)
- [Example Flows](https://github.com/mobile-dev-inc/maestro/tree/main/maestro-test)
