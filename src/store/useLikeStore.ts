import { create } from 'zustand';

interface LikeState {
  like: number;
  increaseLike: () => void;
  removeAllLikes: () => void;
  updateLike: (number: number) => void;
}

export const useLike = create<LikeState>((set) => ({
  like: 0,
  increaseLike: () => set((state) => ({ like: state.like + 1 })),
  removeAllLikes: () => set({ like: 0 }),
  updateLike: (newLike) => set({ like: newLike }),
}));
