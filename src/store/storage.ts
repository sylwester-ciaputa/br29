import { Platform } from 'react-native';
import { StateStorage } from 'zustand/middleware';

// Define a type that matches the MMKV interface we need
interface StorageInterface {
  set: (key: string, value: string) => void;
  getString: (key: string) => string | undefined;
  remove: (key: string) => void;
}

let storage: StorageInterface;

// Helper to create in-memory storage fallback
const createInMemoryStorage = (): StorageInterface => {
  const memory = new Map<string, string>();
  return {
    set: (key, value) => memory.set(key, value),
    getString: (key) => memory.get(key),
    remove: (key) => memory.delete(key),
  };
};

try {
  if (Platform.OS !== 'web') {
    // Try to require MMKV. If it fails (e.g. in Expo Go), it will throw.
    // However, Metro might bundle it anyway. To avoid crash in Expo Go,
    // we need to be careful. React Native MMKV JSI binding happens at import time usually.
    // Using inline require might help but Metro is static.

    // Check if we are in Expo Go
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Constants = require('expo-constants').default;
    const isExpoGo = Constants.appOwnership === 'expo';

    if (isExpoGo) {
      console.warn(
        'MMKV is not supported in Expo Go. Using in-memory storage.'
      );
      storage = createInMemoryStorage();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { createMMKV } = require('react-native-mmkv');
      storage = createMMKV();
    }
  } else {
    // Mock implementation for Web using localStorage
    storage = {
      set: (name, value) => {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(name, value);
        }
      },
      getString: (name) => {
        if (typeof localStorage !== 'undefined') {
          return localStorage.getItem(name) ?? undefined;
        }
        return undefined;
      },
      remove: (name) => {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(name);
        }
      },
    };
  }
} catch (e) {
  console.warn(
    'Failed to initialize MMKV, falling back to in-memory storage:',
    e
  );
  storage = createInMemoryStorage();
}

export const mmkvStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.remove(name);
  },
};
