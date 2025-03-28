import { create } from "zustand";

export const ThemeStore = create((set)=> ({
    theme: localStorage.getItem("theme") || "light",
    toggleTheme: ()=>set((state)=>{
        const newTheme = state.theme === "dark" ? "light":"dark"
        localStorage.setItem("theme", newTheme)
        return {theme: newTheme}
    })
}))