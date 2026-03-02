"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import WebinarPopUp from "./WebinarPopUp";

interface WebinarPopUpContextType {
  openPopup: () => void;
  closePopup: () => void;
}

const WebinarPopUpContext = createContext<WebinarPopUpContextType>({
  openPopup: () => {},
  closePopup: () => {},
});

export function WebinarPopUpProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <WebinarPopUpContext.Provider
      value={{ openPopup: () => setIsOpen(true), closePopup: () => setIsOpen(false) }}
    >
      {children}
      <WebinarPopUp isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </WebinarPopUpContext.Provider>
  );
}

export function useWebinarPopUp() {
  return useContext(WebinarPopUpContext);
}