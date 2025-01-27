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
  sid?: string;
  iid?: string;
  newName?: string;
}

interface IItemReducer extends IState {
  dispatch: React.Dispatch<IAction>;
}

const initialState = {
  currentSub: "",
  list: [],
};

function itemReducer(state: IState, action: IAction): IState {
  const list = state.list;
  const { type, sid, iid, newName } = action;
  const now = new Date().toISOString();
  switch (type) {
    case "ENTER_SUB":
      return {
        currentSub: sid || "0",
        list: list,
      };
    case "ADD_SUB":
      const nextSid = list.length
        ? String(Math.max(...list.map((sub) => Number(sub.subjectId)))+1) + ""
        : "0";
      return {
        currentSub: nextSid,
        list: [
          ...list,
          {
            subjectId: nextSid,
            name: newName,
            items: [],
            created: now,
            updated: now,
          },
        ],
      };
    case "EDIT_SUBNAME":
      return {
        currentSub: sid || "0",
        list: list.map((sub) =>
          sub.subjectId === sid ? { ...sub, name: newName, updated: now } : sub
        ),
      };
    case "DELETE_SUB":
      return {
        currentSub: sid || "0",
        list: list.filter((sub) => sub.subjectId !== sid),
      };
    case "ADD_ITEM":
      const items = list.find((sub) => sub.subjectId === sid)?.items;
      const nextIid = items && items.length ? String(Math.max(...items.map((item) => +item.itemId)) + 1) : "0"; 
      return {
        currentSub: sid || "0",
        list: list.map((sub) =>
          sub.subjectId === sid
            ? {
                ...sub,
                items: [
                  ...sub.items,
                  {
                    itemId: nextIid,
                    name: newName || nextIid,
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

export function useItem() {
  return useContext(ItemContext);
}
