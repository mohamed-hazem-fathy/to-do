import { createContext, useState } from "react";
import SnackBar from "../components/SnackBar";

export const TostContext = createContext({});

export const TostProvider = ({ children }) => {
  const [massage, setMassage] = useState("");
  const [open, setOpen] = useState(false);
  function showHideToast(massage) {
    setOpen(true);
    setMassage(massage);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <TostContext.Provider value={{ showHideToast }}>
      <SnackBar open={open} massage={massage} />
      {children}
    </TostContext.Provider>
  );
};
