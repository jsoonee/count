import { getItem, setItem } from "@/utils/localStorage";
import { create } from "zustand";

interface ConfigStore {
  username: string;
  theme: string;
  color: string;
  setUsername: (newUsername: string) => void;
  setTheme: (newTheme: string) => void;
  setColor: (newColor: string) => void;
}

const useConfigStore = create<ConfigStore>((set, get) => {
  const storage = getItem("config");
  const initialState = {
    username: storage?.username || "username",
    theme: storage?.theme || "os",
    color: storage?.color || "blue",
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
    setTheme: (newTheme) => {
      set({ theme: newTheme });
      setStorage();
    },
    setColor: (newColor) => {
      set({ color: newColor });
      setStorage();
    },
  };
});

export default useConfigStore;
