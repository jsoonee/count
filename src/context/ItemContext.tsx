import React, { createContext, useContext, useReducer } from "react";

interface IItem {
  id: number;
  name: string;
  count: number;
  memo: string;
  star: boolean;
  created: Date;
  updated: Date;
}

interface ISubject {
  id: number;
  name: string | undefined;
  items: IItem[];
  created: Date;
  updated: Date;
}

interface IAction {
  type: string;
  subjectId?: number;
  itemId?: number;
  newName?: string;
}

interface IItemReducer {
  state: ISubject[];
  dispatch: React.Dispatch<IAction>;
}

function itemReducer(state: ISubject[], action: IAction): ISubject[] {
  const now = new Date();
  switch (action.type) {
    case "ADD_SUB":
      return [
        {
          id: state.length,
          name: action.newName,
          items: [],
          created: now,
          updated: now,
        },
        ...state,
      ];
    case "EDIT_SUBNAME":
      return state.map((sub) =>
        sub.id === action.subjectId ? { ...sub, name: action.newName } : sub
      );
    case "DELETE_SUB":
      return state.filter((sub) => sub.id !== action.subjectId);
    default:
      return state;
  }
}

const ItemContext = createContext<IItemReducer>({ state: [], dispatch: () => null });

export function ItemProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(itemReducer, []);
  return (
    <ItemContext.Provider value={{ state, dispatch }}>
      {children}
    </ItemContext.Provider>
  );
}

export function useItem() {
  return useContext(ItemContext);
}