// src/context/LoaderContext.jsx
import React, { createContext, useState, useContext } from "react";
import Loader from "../components/Loader";

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ setLoading }}>
      {loading && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
}
