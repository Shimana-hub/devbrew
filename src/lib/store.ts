import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "./supabase";

type WidgetKey = "github" | "weather" | "bookmarks" | "notes" | "timer";

interface Bookmark {
  id: string;
  label: string;
  url: string;
}

type Note = {
  id: string;
  title: string;
  content: string;
  updated_at: string;
};

interface DashboardStore {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;

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

  notes: Note[];
  setNotes: (value: Note[]) => void;
  fetchNotes: (userId: string) => Promise<void>;
  createNote: (userId: string, title: string) => Promise<Note | null>;
  updateNote: (note: Note, userId: string) => Promise<void>;
  deleteNote: (id: string, userId: string) => Promise<void>;

  loading: boolean;
  setLoading: (value: boolean) => void;
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

      timerRunning: false,
      secondsLeft: 25 * 60,
      startTimer: () => set({ timerRunning: true }),
      pauseTimer: () => set({ timerRunning: false }),
      resetTimer: () => set({ secondsLeft: 25 * 60, timerRunning: false }),

      widgetOrder: ["github", "weather", "bookmarks", "notes", "timer"],
      setWidgetOrder: (order) => set({ widgetOrder: order }),

      fetchBookmarks: async (userId: string) => {
        set({ loading: true });
        const { data } = await supabase
          .from("bookmarks")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: true });
        set({ bookmarks: data || [] });
        set({ loading: false });
      },

      saveBookmark: async (bookmark: Bookmark, userId: string) => {
        await supabase
          .from("bookmarks")
          .insert([{ ...bookmark, user_id: userId }]);
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

      notes: [],
      setNotes: (value: Note[]) => set({ notes: value }),

      fetchNotes: async (userId: string) => {
        set({ loading: true });
        const { data } = await supabase
          .from("notes")
          .select("*")
          .eq("user_id", userId)
          .order("updated_at", { ascending: false });
        if (data) set({ notes: data });
        set({ loading: false });
      },

      createNote: async (userId: string, title: string) => {
        const { data, error } = await supabase
          .from("notes")
          .insert([{ user_id: userId, title, content: "" }])
          .select()
          .single();
        if (!error && data) {
          set((state) => ({ notes: [data, ...state.notes] }));
          return data;
        }
        return null;
      },

      updateNote: async (note: Note, userId: string) => {
        const { error } = await supabase
          .from("notes")
          .update({
            title: note.title,
            content: note.content,
            updated_at: new Date().toISOString(),
          })
          .eq("id", note.id)
          .eq("user_id", userId);
        if (!error) {
          set((state) => ({
            notes: state.notes.map((n) => (n.id === note.id ? note : n)),
          }));
        }
      },

      deleteNote: async (id: string, userId: string) => {
        await supabase.from("notes").delete().eq("id", id).eq("user_id", userId);
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        }));
      },

      loading: false,
      setLoading: (value: boolean) => set({ loading: value }),
    }),
    {
      name: "devbrew-dashboard",
    }
  )
);