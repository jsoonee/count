import { getItem, setItem } from "@/utils/localStorage";
import { create } from "zustand";

interface ConfigStore {
  username: string;
  theme: string;
  color: string;
  setUsername: (newUsername: string) => void;
  setTheme: (theme: string) => void;
  setColor: (color: string) => void;
}

const useConfigStore = create<ConfigStore>((set, get) => {
  const storage = getItem("config");
  const initialState = {
    username: storage?.username || "",
    theme: storage?.theme || "os",
    color: storage?.color || "pink",
  };

  function setStorage() {
    const { username, theme, color } = get();
    const config = {
      username: username,
      theme: theme,
      color: color,
    };
    setItem("config", config);
  }

  return {
    ...initialState,
    setUsername: (newUsername) => {
      set({ username: newUsername });
      setStorage();
    },
    setTheme: (theme) => {
      set({ theme: theme });
      if (theme === "dark" || theme === "light") {
        document.documentElement.classList.toggle("dark", theme === "dark");
      } else {
        document.documentElement.classList.toggle(
          "dark",
          window.matchMedia("(prefers-color-scheme: dark)").matches
        );
      }
      setStorage();
    },
    setColor: (color) => {
      set({ color: color });
    },
  };
});

export default useConfigStore;
