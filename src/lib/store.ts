import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "./supabase";

type WidgetKey = "github" | "weather" | "bookmarks" | "notes" | "timer";

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

  widgetOrder: WidgetKey[];
  setWidgetOrder: (order: WidgetKey[]) => void;

  fetchBookmarks: (userId: string) => Promise<void>;
  saveBookmark: (bookmark: Bookmark, userId: string) => Promise<void>;
  deleteBookmark: (id: string, userId: string) => Promise<void>;
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
      resetTimer: () => set({ secondsLeft: 25 * 60, timerRunning: false }),

      widgetOrder: ["github", "weather", "bookmarks", "notes", "timer"],
      setWidgetOrder: (order) => set({ widgetOrder: order }),

      // Async Supabase methods
      fetchBookmarks: async (userId: string) => {
        const { data } = await supabase
          .from("bookmarks")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: true });
        set({ bookmarks: data || [] });
      },

      saveBookmark: async (bookmark: Bookmark, userId: string) => {
        await supabase.from("bookmarks").insert([{ ...bookmark, user_id: userId }]);
        set((state) => ({ bookmarks: [...state.bookmarks, bookmark] }));
      },

      deleteBookmark: async (id: string, userId: string) => {
        await supabase
          .from("bookmarks")
          .delete()
          .eq("id", id)
          .eq("user_id", userId);
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        }));
      },
    }),
    {
      name: "devbrew-dashboard",
    }
  )
);