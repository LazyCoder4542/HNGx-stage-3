import React, { createContext, useState, useContext, useCallback } from "react";

const PopupContext = createContext<IPopupContext | null>(null);

interface IProps {
  children: React.ReactNode;
}
type IPopupContext = {
    value: string | null;
    status: "success" | "error";
    triggerPopup: (text: string, status: 'error' | 'success') => void;
    clearPopup: () => void;
  };

export const PopupProvider = ({ children }: IProps) => {
  const [value, setValue] = useState<string | null>(null);
  const [status, setStatus] = useState<"success" | "error">("success");
  const triggerPopup = useCallback((text: string, status: 'error' | 'success') => {setValue(text); setStatus(status)}, []);
  const clearPopup = useCallback(() => setValue(null), []);
  console.log("here");
  
  return (
    <PopupContext.Provider value={{ value, status, triggerPopup, clearPopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
export type { IPopupContext };
