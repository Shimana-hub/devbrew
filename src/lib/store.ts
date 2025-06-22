import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Bookmark {
  id: string;
  label: string;
  url: string;
}

interface DashboardStore {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;

  notes: string;
  setNotes: (value: string) => void;

  timerRunning: boolean;
  secondsLeft: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (bookmark) =>
        set({ bookmarks: [...get().bookmarks, bookmark] }),
      removeBookmark: (id) =>
        set({
          bookmarks: get().bookmarks.filter((b) => b.id !== id),
        }),
      notes: "",
      setNotes: (value) => set({ notes: value }),

      timerRunning: false,
      secondsLeft: 25 * 60,
      startTimer: () => set({ timerRunning: true }),
      pauseTimer: () => set({ timerRunning: false }),
      resetTimer: () =>
        set({ secondsLeft: 25 * 60, timerRunning: false }),
    }),
    {
      name: "devbrew-dashboard",
    }
  )
);
