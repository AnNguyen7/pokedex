"use client";

// AnN add: Shiny theme context for Pokemon detail pages on 10/13/2025
import { createContext, useContext, useState, ReactNode } from "react";

interface ShinyContextType {
  isShiny: boolean;
  setIsShiny: (isShiny: boolean) => void;
  toggleShiny: () => void;
}

const ShinyContext = createContext<ShinyContextType | undefined>(undefined);

export function ShinyProvider({ children }: { children: ReactNode }) {
  const [isShiny, setIsShiny] = useState(false);

  const toggleShiny = () => {
    setIsShiny(prev => !prev);
  };

  return (
    <ShinyContext.Provider value={{ isShiny, setIsShiny, toggleShiny }}>
      {children}
    </ShinyContext.Provider>
  );
}

export function useShiny() {
  const context = useContext(ShinyContext);
  if (context === undefined) {
    throw new Error("useShiny must be used within a ShinyProvider");
  }
  return context;
}