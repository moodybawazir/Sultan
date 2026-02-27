import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  theme: 'dark' | 'light' | 'paper';
  fontSize: number;
  reciter: string;
  showTranslation: boolean;
  translationLang: string;
  lastRead: { surah: number; ayah: number } | null;
  bookmarks: { surah: number; ayah: number; text: string; date: string }[];
  audioState: {
    isPlaying: boolean;
    currentSurah: number;
    currentAyah: number;
  };
  setTheme: (theme: 'dark' | 'light' | 'paper') => void;
  setFontSize: (size: number) => void;
  setReciter: (reciter: string) => void;
  setShowTranslation: (show: boolean) => void;
  setTranslationLang: (lang: string) => void;
  setLastRead: (surah: number, ayah: number) => void;
  addBookmark: (bookmark: { surah: number; ayah: number; text: string; date: string }) => void;
  removeBookmark: (surah: number, ayah: number) => void;
  setAudioState: (state: Partial<AppState['audioState']>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark',
      fontSize: 28,
      reciter: 'ar.abdulbasitmurattal',
      showTranslation: false,
      translationLang: 'en.asad',
      lastRead: null,
      bookmarks: [],
      audioState: {
        isPlaying: false,
        currentSurah: 1,
        currentAyah: 1,
      },
      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      setReciter: (reciter) => set({ reciter }),
      setShowTranslation: (showTranslation) => set({ showTranslation }),
      setTranslationLang: (translationLang) => set({ translationLang }),
      setLastRead: (surah, ayah) => set({ lastRead: { surah, ayah } }),
      addBookmark: (bookmark) => set((state) => ({ bookmarks: [...state.bookmarks, bookmark] })),
      removeBookmark: (surah, ayah) => set((state) => ({
        bookmarks: state.bookmarks.filter(b => !(b.surah === surah && b.ayah === ayah))
      })),
      setAudioState: (state) => set((prev) => ({ audioState: { ...prev.audioState, ...state } })),
    }),
    {
      name: 'quran-lux-storage',
    }
  )
);
