import { create } from 'zustand'

export const useThemeStore = create((set)=>({
    //we have saved theme to local storage so on refresh it doesnt changes out
    theme: localStorage.getItem("streamify-theme") || "coffee",
    setTheme: (theme)=> {
        localStorage.setItem("streamify-theme", theme);
        set({theme})
    },
}));

