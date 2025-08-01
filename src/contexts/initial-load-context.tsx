"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface InitialLoadContextType {
  isInitialLoad: boolean;
}

const InitialLoadContext = createContext<InitialLoadContextType | undefined>(
  undefined
);

interface InitialLoadProviderProps {
  children: ReactNode;
}

export function InitialLoadProvider({ children }: InitialLoadProviderProps) {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsInitialLoad(false);
    }, 3000);
  }, []);

  return (
    <InitialLoadContext.Provider value={{ isInitialLoad }}>
      {children}
    </InitialLoadContext.Provider>
  );
}

export default function useInitialLoad() {
  const context = useContext(InitialLoadContext);
  if (context === undefined) {
    throw new Error(
      "useInitialLoad must be used within an InitialLoadProvider"
    );
  }
  return context;
} 