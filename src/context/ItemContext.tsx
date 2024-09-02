import React, { createContext, useContext, useReducer } from "react";

interface IItem {
  id: number;
  name: string;
  count: number;
  memo: string;
  star: boolean;
  created: string;
  updated: string;
}

interface ISubject {
  id: number;
  name: string | undefined;
  items: IItem[];
  created: string;
  updated: string;
}

interface IState {
  currentSub: number;
  list: ISubject[];
}

interface IAction {
  type: string;
  isCurrentSub: boolean;
  subjectId?: number;
  itemId?: number;
  newName?: string;
}

interface IItemReducer extends IState {
  dispatch: React.Dispatch<IAction>;
}

const initialState = {
  currentSub: 0,
  list: []
}

function itemReducer(state: IState, action: IAction): IState {
  const list = state.list;
  const { type, isCurrentSub, subjectId, itemId, newName } = action;
  const now = new Date().toISOString();
  switch (type) {
    case "ADD_SUB":
      return {
        currentSub: 0,
        list: [
          ...list,
          {
            id: nextId++,
            name: newName,
            items: [],
            created: now,
            updated: now,
          },
        ],
      };
    case "EDIT_SUBNAME":
      return {
        currentSub: isCurrentSub && subjectId ? subjectId : 0,
        list: list.map((sub) =>
          sub.id === subjectId ? { ...sub, name: newName, updated: now } : sub
        ),
      };
    case "DELETE_SUB":
      return {
        currentSub: 0,
        list: list.filter((sub) => sub.id !== action.subjectId),
      };
    case "ADD_ITEM":
      return {
        currentSub: subjectId || 0,
        list: list.map(sub => sub.id === subjectId ? { ...sub, items: [...sub.items, {id: nextIid++, name: newName || nextIid+"", count: 1, memo: "", star: false, created: now, updated: now}]} : sub)
      }
    default:
      return state;
  }
}

const ItemContext = createContext<IItemReducer>({
  currentSub: 0,
  list: [],
  dispatch: () => null,
});

export function ItemProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(itemReducer, initialState);
  const { currentSub, list } = state;
  return (
    <ItemContext.Provider value={{ currentSub, list, dispatch }}>
      {children}
    </ItemContext.Provider>
  );
}

let nextId = 1;
let nextIid = 1;

export function useItem() {
  return useContext(ItemContext);
}
