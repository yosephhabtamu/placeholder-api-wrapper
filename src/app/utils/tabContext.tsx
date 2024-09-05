import { createContext, useContext, useState, ReactNode } from "react";

interface TabStateType {
  currentTabState: "Todo" | "Post" | "User" | "Photo" | "Album";
  setCurrentTabState: (
    tab: "Todo" | "Post" | "User" | "Photo" | "Album"
  ) => void;
}

const CurrentTabContext = createContext<TabStateType | undefined>(undefined);

export const CurrentTabProvider = ({ children }: { children: ReactNode }) => {
  const [currentTabState, setCurrentTabState] = useState<
    "Todo" | "Post" | "User" | "Photo" | "Album"
  >("Todo");

  return (
    <CurrentTabContext.Provider value={{ currentTabState, setCurrentTabState }}>
      {children}
    </CurrentTabContext.Provider>
  );
};

export const useCurrentTabProvider = (): TabStateType => {
  const context = useContext(CurrentTabContext);
  if (context === undefined) {
    throw new Error(
      "CurrentTabContext must be used within a CurrentTabProvider"
    );
  }
  return context;
};
