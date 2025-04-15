import { getItem, setItem } from "@/utils/localStorage";
import { create } from "zustand";

interface ConfigStore {
  username: string;
  theme: string;
  setUsername: (newUsername: string) => void;
  setTheme: (theme: string) => void;
}

const useConfigStore = create<ConfigStore>((set, get) => {
  const storage = getItem("config");
  const initialState = {
    username: storage?.username || "username",
    theme: storage?.theme || "os",
  };

  function setStorage() {
    const { username, theme } = get();
    const config = {
      username: username,
      theme: theme,
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
      setStorage();
    },
  };
});

export default useConfigStore;
