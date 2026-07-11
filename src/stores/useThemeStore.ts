import { create } from "zustand"

export type ThemeMode = "light" | "dark"

interface ThemeState {
  mode: ThemeMode
  toggleTheme: () => void
  setTheme: (mode: ThemeMode) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: (localStorage.getItem("theme") as ThemeMode) || "light",

  toggleTheme: () =>
    set((state) => {
      const next = state.mode === "light" ? "dark" : "light"
      localStorage.setItem("theme", next)
      return { mode: next }
    }),

  setTheme: (mode: ThemeMode) => {
    localStorage.setItem("theme", mode)
    set({ mode })
  }
}))
