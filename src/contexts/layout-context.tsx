"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import {
  initialLayoutState,
  layoutReducer,
  Action,
  StateProps,
} from "@/reducers/layout-reducer";

interface ProviderProps {
  children: ReactNode;
}

interface LayoutContextProps {
  state: StateProps;
  dispatch: React.Dispatch<Action>;
}

const LayoutContext = createContext({} as LayoutContextProps);

export const LayoutContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(layoutReducer, initialLayoutState);
  return (
    <LayoutContext.Provider value={{ state, dispatch }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  return useContext(LayoutContext);
};
