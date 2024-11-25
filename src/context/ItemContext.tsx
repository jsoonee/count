import React, { createContext, useContext, useReducer } from "react";

interface IItem {
  itemId: string;
  name: string;
  count: number;
  memo: string;
  star: boolean;
  created: string;
  updated: string;
}

interface ISubject {
  subjectId: string;
  name: string | undefined;
  items: IItem[];
  created: string;
  updated: string;
}

interface IState {
  currentSub: string;
  list: ISubject[];
}

interface IAction {
  type: string;
  isCurrentSub: boolean;
  sid?: string;
  iid?: string;
  newName?: string;
}

interface IItemReducer extends IState {
  dispatch: React.Dispatch<IAction>;
}

const initialState = {
  currentSub: "0",
  list: [],
};

function itemReducer(state: IState, action: IAction): IState {
  const list = state.list;
  const { type, isCurrentSub, sid, iid, newName } = action;
  const now = new Date().toISOString();
  switch (type) {
    case "ADD_SUB":
      return {
        currentSub: "0",
        list: [
          ...list,
          {
            subjectId: nextId++ + "",
            name: newName,
            items: [],
            created: now,
            updated: now,
          },
        ],
      };
    case "EDIT_SUBNAME":
      return {
        currentSub: isCurrentSub && sid ? sid : "0",
        list: list.map((sub) =>
          sub.subjectId === sid ? { ...sub, name: newName, updated: now } : sub
        ),
      };
    case "DELETE_SUB":
      return {
        currentSub: "0",
        list: list.filter((sub) => sub.subjectId !== sid),
      };
    case "ADD_ITEM":
      return {
        currentSub: sid || "0",
        list: list.map((sub) =>
          sub.subjectId === sid
            ? {
                ...sub,
                items: [
                  ...sub.items,
                  {
                    itemId: nextIid++ + "",
                    name: newName || nextIid + "",
                    count: 1,
                    memo: "",
                    star: false,
                    created: now,
                    updated: now,
                  },
                ],
              }
            : sub
        ),
      };
    case "INCREMENT":
      return {
        currentSub: sid || "0",
        list: list.map((sub) =>
          sub.subjectId === sid
            ? {
                ...sub,
                items: sub.items.map((it) =>
                  it.itemId === iid ? { ...it, count: it.count + 1 } : it
                ),
              }
            : sub
        ),
      };
    default:
      return state;
  }
}

const ItemContext = createContext<IItemReducer>({
  currentSub: "0",
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
