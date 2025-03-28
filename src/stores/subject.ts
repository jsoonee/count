import { getItem, setItem } from "@/utils/localStorage";
import { create } from "zustand";

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
  addSubject: (newSubject: ISubject) => void;
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

  const now = new Date().toISOString();

  return {
    subjects: initialState,
    currentSubject: "",
    setCurrentSubject: (subjectId) => set({ currentSubject: subjectId }),
    importSubjects: (subjects) => {
      set({ subjects: subjects });
      setStorage();
    },
    addSubject: (newSubject) => {
      set(({ subjects }) => ({ subjects: [newSubject, ...subjects] }));
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
                        updated: now,
                      }
                    : it
                ),
                updated: now,
              }
            : sub
        ),
      }));
      setStorage();
    },
    countDown: (itemId) => {
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
                        updated: now,
                      }
                    : it
                ),
                updated: now,
              }
            : sub
        ),
      }));
      setStorage();
    },
  };
});

export default useSubjectStore;
