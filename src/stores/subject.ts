import { getItem, setItem } from "@/utils/localStorage";
import { create } from "zustand";
import { v4 } from "uuid";

interface ISortBy {
  by: string;
  asc: boolean;
}

export interface ISubject {
  id: string;
  name: string;
  items: IItem[];
  sort: ISortBy;
  description: string;
  star: boolean;
  created: string;
  updated: string;
}

export interface IItem {
  id: string;
  name: string;
  count: number;
  description: string;
  star: boolean;
  created: string;
  updated: string;
}

interface SubjectStore {
  subjects: ISubject[];
  sortBy: ISortBy;
  sorted: ISubject[];
  currentSubject: string;
  setCurrentSubject: (subjectId: string) => void;
  setSubjects: (subjects: ISubject[]) => void;
  setSubjectSort: (s: ISortBy) => void;
  setSorted: () => void;
  addSubject: (subjectName: string) => void;
  editSubject: (subjectId: string, subject: ISubject) => void;
  removeSubject: (subjectId: string) => void;
  setItemSort: (s: ISortBy) => void;
  addItem: (itemName: string) => void;
  editItem: (itemId: string, item: IItem) => void;
  removeItem: (itemId: string) => void;
  countUp: (itemId: string) => void;
  countDown: (itemId: string) => void;
}

const useSubjectStore = create<SubjectStore>((set, get) => {
  const initialState = getItem("data") || [];
  const initialSort = getItem("config")?.sort || { by: "created", asc: false };

  function setStorage() {
    const { subjects } = get();
    setItem("data", subjects);
  }

  function sortSubjects(subjects: ISubject[], sortBy?: ISortBy) {
    const { by, asc } = sortBy || { by: "created", asc: false };
    if (by === "name") {
      return [...subjects].sort((a, b) =>
        asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
    }
    if (by === "number") {
      return [...subjects].sort((a, b) => {
        const lenA = a.items.length;
        const lenB = b.items.length;
        return asc
          ? lenA - lenB || a.created.localeCompare(b.created)
          : lenB - lenA || b.created.localeCompare(a.created);
      });
    }
    if (by === "count") {
      return [...subjects].sort((a, b) => {
        const sumA = a.items.reduce((acc, cur) => acc + cur.count, 0);
        const sumB = b.items.reduce((acc, cur) => acc + cur.count, 0);
        return asc
          ? sumA - sumB || a.created.localeCompare(b.created)
          : sumB - sumA || b.created.localeCompare(a.created);
      });
    }
    if (by === "updated") {
      return [...subjects].sort((a, b) =>
        asc
          ? a.updated.localeCompare(b.updated)
          : b.updated.localeCompare(a.updated)
      );
    }
    return asc ? [...subjects].reverse() : [...subjects];
  }

  const now = () => new Date().toISOString();

  return {
    subjects: initialState,
    sortBy: initialSort,
    sorted: sortSubjects(initialState, initialSort),
    currentSubject: "",
    setCurrentSubject: (subjectId) => set({ currentSubject: subjectId }),
    setSubjects: (subjects) => {
      set({ subjects: subjects });
      setStorage();
    },
    setSubjectSort: (s) => {
      set(({ subjects }) => ({ sorted: sortSubjects(subjects, s), sortBy: s }));
      const config = getItem("config") || {};
      setItem("config", { ...config, sort: s });
    },
    setSorted: () => {
      set(({ subjects, sortBy }) => ({
        sorted: sortSubjects(subjects, sortBy),
      }));
    },
    addSubject: (subjectName) => {
      const nowStr = now();
      const newSubject = {
        id: v4(),
        name: subjectName,
        items: [],
        sort: { by: "created", asc: false },
        description: "",
        star: false,
        created: nowStr,
        updated: nowStr,
      };
      set(({ subjects }) => ({
        subjects: [newSubject, ...subjects],
      }));
      setStorage();
    },
    editSubject: (subjectId, subject) => {
      set(({ subjects }) => ({
        subjects: subjects.map((sub) => (sub.id === subjectId ? subject : sub)),
      }));
      setStorage();
    },
    removeSubject: (id) => {
      set(({ subjects }) => ({
        subjects: subjects.filter((sub) => sub.id !== id),
      }));
      setStorage();
    },
    setItemSort: (s) => {
      set(({ subjects, currentSubject }) => ({
        subjects: subjects.map((sub) =>
          sub.id === currentSubject ? { ...sub, sort: s } : sub
        ),
      }));
      setStorage();
    },
    addItem: (itemName) => {
      const nowStr = now();
      const newItem = {
        id: v4(),
        name: itemName,
        count: 1,
        description: "",
        star: false,
        created: nowStr,
        updated: nowStr,
      };
      set(({ subjects, currentSubject }) => ({
        subjects: subjects.map((sub) =>
          sub.id === currentSubject
            ? {
                ...sub,
                items: [newItem, ...sub.items],
                updated: nowStr,
              }
            : sub
        ),
      }));
      setStorage();
    },
    editItem: (itemId, item) => {
      set(({ subjects, currentSubject }) => ({
        subjects: subjects.map((sub) =>
          sub.id === currentSubject
            ? {
                ...sub,
                items: sub.items.map((it) => (it.id === itemId ? {...item} : it)),
                updated: item.updated,
              }
            : sub
        ),
      }));
      setStorage();
    },
    removeItem: (itemId) => {
      set(({ subjects, currentSubject }) => ({
        subjects: subjects.map((sub) =>
          sub.id === currentSubject
            ? { ...sub, items: sub.items.filter((it) => it.id !== itemId) }
            : sub
        ),
      }));
      setStorage();
    },
    countUp: (itemId) => {
      const nowStr = now();
      set(({ subjects, currentSubject }) => ({
        subjects: subjects.map((sub) =>
          sub.id === currentSubject
            ? {
                ...sub,
                items: sub.items.map((it) =>
                  it.id === itemId
                    ? {
                        ...it,
                        count: it.count + 1 < 10 ** 5 ? it.count + 1 : it.count,
                        updated: nowStr,
                      }
                    : it
                ),
                updated: nowStr,
              }
            : sub
        ),
      }));
      setStorage();
    },
    countDown: (itemId) => {
      const nowStr = now();
      set(({ subjects, currentSubject }) => ({
        subjects: subjects.map((sub) =>
          sub.id === currentSubject
            ? {
                ...sub,
                items: sub.items.map((it) =>
                  it.id === itemId
                    ? {
                        ...it,
                        count: it.count ? it.count - 1 : 0,
                        updated: nowStr,
                      }
                    : it
                ),
                updated: nowStr,
              }
            : sub
        ),
      }));
      setStorage();
    },
  };
});

export default useSubjectStore;
