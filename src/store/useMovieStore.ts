import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Movie } from '../types';
import { mmkvStorage } from './storage';

interface MovieState {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (imdbID: string) => void;
  isFavorite: (imdbID: string) => boolean;
}

export const useMovieStore = create<MovieState>()(
  persist(
    immer((set, get) => ({
      favorites: [],
      addFavorite: (movie) =>
        set((state) => {
          const exists = state.favorites.some((m) => m.imdbID === movie.imdbID);
          if (!exists) {
            state.favorites.push(movie);
          }
        }),
      removeFavorite: (imdbID) =>
        set((state) => {
          state.favorites = state.favorites.filter((m) => m.imdbID !== imdbID);
        }),
      isFavorite: (imdbID) => {
        return get().favorites.some((m) => m.imdbID === imdbID);
      },
    })),
    {
      name: 'movie-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
