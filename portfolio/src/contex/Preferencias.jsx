import { createContext, useContext } from "react";

export const IdiomaContext = createContext("pt");

export function useIdioma() {
  return useContext(IdiomaContext);
  
}
