import { getItem, setItem } from "@/utils/localStorage";
import { create } from "zustand";
import { v4 } from "uuid";

interface ISubject {
  id: string;
  name: string;
  items: IItem[];
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
  currentSubject: string;
  importSubjects: (subjects: ISubject[]) => void;
  setCurrentSubject: (subjectId: string) => void;
  addSubject: (subjectName: string) => void;
  editSubject: (subjectId: string, subject: ISubject) => void;
  removeSubject: (subjectId: string) => void;
  addItem: (newItem: IItem) => void;
  editItem: (itemId: string, item: IItem) => void;
  removeItem: (itemId: string) => void;
  countUp: (itemId: string) => void;
  countDown: (itemId: string) => void;
}

const useSubjectStore = create<SubjectStore>((set, get) => {
  const initialState = getItem("data") || [];

  function setStorage() {
    const { subjects } = get();
    setItem("data", subjects);
  }

  const now = () => new Date().toISOString();

  return {
    subjects: initialState,
    currentSubject: "",
    setCurrentSubject: (subjectId) => set({ currentSubject: subjectId }),
    importSubjects: (subjects) => {
      set({ subjects: subjects });
      setStorage();
    },
    addSubject: (subjectName) => {
      const nowStr = now();
      const newSubject = {
        id: v4(),
        name: subjectName,
        items: [],
        description: "",
        star: false,
        created: nowStr,
        updated: nowStr,
      };
      set(({ subjects }) => ({
        subjects: [newSubject, ...subjects],
      }));
      setStorage();
      console.log(get().subjects);
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
    addItem: (newItem) => {
      set(({ subjects, currentSubject }) => ({
        subjects: subjects.map((sub) =>
          sub.id === currentSubject
            ? {
                ...sub,
                items: [newItem, ...sub.items],
                updated: newItem.updated,
              }
            : sub
        ),
      }));
      setStorage();
    },
    editItem: (itemId, item) => {
      console.log("editItem");
      set(({ subjects, currentSubject }) => ({
        subjects: subjects.map((sub) =>
          sub.id === currentSubject
            ? {
                ...sub,
                items: sub.items.map((it) => (it.id === itemId ? item : it)),
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
