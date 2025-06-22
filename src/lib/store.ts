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
    }),
    {
      name: "devbrew-dashboard",
    }
  )
);
