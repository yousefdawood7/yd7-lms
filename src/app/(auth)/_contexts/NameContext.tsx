"use client";

import { createContext, use, useState } from "react";

type NameContextType = {
  name: string;
  setName: (name: string) => void;
  resetName: () => void;
};

const NameContext = createContext<NameContextType | undefined>(undefined);
NameContext.displayName = "NameContext";

export function NameProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<string>("");

  function handleResetName() {
    setName("");
  }

  return (
    <NameContext value={{ name, setName, resetName: handleResetName }}>
      {children}
    </NameContext>
  );
}

export const useName = function () {
  const value = use(NameContext);

  if (value === undefined)
    throw new Error("Name Context used out of its provider");

  return value;
};
