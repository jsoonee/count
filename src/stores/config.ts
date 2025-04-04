import { getItem, setItem } from "@/utils/localStorage";
import { create } from "zustand";

interface ISortBy {
  by: string;
  asc: boolean;
}

interface ConfigStore {
  sort: ISortBy;
  username: string;
  theme: string;
  color: string;
  setSort: (sort: ISortBy) => void;
  setUsername: (newUsername: string) => void;
  setTheme: (newTheme: string) => void;
  setColor: (newColor: string) => void;
}

const useConfigStore = create<ConfigStore>((set, get) => {
  const storage = getItem("config");
  const initialState = {
    sort: storage?.sort || {by: "created", asc: false},
    username: storage?.username || "username",
    theme: storage?.theme || "os",
    color: storage?.color || "blue",
  };

  function setStorage() {
    const { sort, username, theme, color } = get();
    const config = {
      sort: sort,
      username: username,
      theme: theme,
      color: color,
    };
    setItem("config", config);
  }

  return {
    ...initialState,
    setSort: (sort) => {
      set({sort: sort});
      setStorage();
    },
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
