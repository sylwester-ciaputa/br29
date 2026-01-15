# Movie Search & Favorites App (br29)

A mobile application built with React Native and Expo that allows users to search for movies using the OMDb API, view details, and manage a list of favorite movies. The app features local data persistence and a clean, modern user interface.

## Features

- **User Authentication**: Simple login mechanism (Mock auth).
- **Movie Search**: Search for movies by title using the OMDb API.
- **Favorites Management**: Add or remove movies from your personal favorites list.
- **Persistent Storage**: Favorites and login state are saved locally using MMKV.
- **Offline Support**: Viewed data persists across app restarts.
- **Tab Navigation**: Easy navigation between Home, Favorites, and Profile/Settings.

## Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Language**: TypeScript
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) + Immer
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest) + Axios
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **Forms**: React Hook Form + Zod
- **Storage**: React Native MMKV
- **Testing**: Cypress (E2E)

## Prerequisites

- **Node.js**: Version **22** (Required)
- **npm** or **yarn**
- **Expo Go** app on your mobile device (Android/iOS) *or* a simulator/emulator.

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd br29
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Configuration

The application requires an OMDb API key to function correctly.

1.  Get a free API key from [OMDb API](http://www.omdbapi.com/apikey.aspx).
2.  Copy the sample configuration file:
    ```bash
    cp src/config/omdbapi.sample.ts src/config/omdbapi.ts
    ```
3.  Open `src/config/omdbapi.ts` and replace `'YOUR_OMDB_API_KEY_HERE'` with your actual API key.

## Running the App

To start the development server:

```bash
npm start
```

This command runs `expo start`, which starts the Metro Bundler.

### 📱 Scanning QR Code
Once the server is running, you will see a QR code in the terminal.
- **Android**: Scan the QR code with the Expo Go app.
- **iOS**: Scan the QR code with the Camera app (requires Expo Go installed).

### ⚠️ Important Note on Storage (MMKV)
This app uses `react-native-mmkv` for high-performance storage. **This library includes native code and does NOT work in the standard "Expo Go" client available on the App Store.**

To run this app on a device, you must use a **Development Build**:
1.  Run `npx expo prebuild` to generate native directories.
2.  Run `npm run android` or `npm run ios` to build and install the development client on your device/emulator.

*Alternatively, for testing logic without native persistence, you can run the web version:*
```bash
npm run web
```

### 🧹 Clearing Cache
If you encounter issues with the bundler or stale changes, you can start the server with the cache cleared:

```bash
npx expo start -c
```
or
```bash
npm start -- --clear
```

## Testing

The project uses Cypress for End-to-End (E2E) testing.

1.  Ensure the app is running locally (usually on web port 8081):
    ```bash
    npm run web
    ```
2.  In a separate terminal, run Cypress:
    ```bash
    npm run test:e2e
    ```
    Or to run headless:
    ```bash
    npm run test:e2e:run
    ```

## Project Structure

```
br29/
├── assets/             # Images and icons
├── cypress/            # E2E tests
├── src/
│   ├── api/            # API clients and hooks
│   ├── components/     # Reusable UI components
│   ├── config/         # App configuration (env vars)
│   ├── navigation/     # Navigation setup
│   ├── screens/        # Screen components
│   ├── store/          # Zustand stores
│   ├── types/          # TypeScript definitions
│   └── utils/          # Helper functions
├── App.tsx             # Entry point
└── package.json        # Dependencies and scripts
```
