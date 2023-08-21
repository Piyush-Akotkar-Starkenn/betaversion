import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [updateData, setUpdateData] = useState(false);

  const updateFunc = () => {
    setUpdateData(true);
  };

  const resetState = () => {
    setUpdateData(false);
  };

  return (
    <AppContext.Provider value={{ updateData, updateFunc, resetState }}>
      {children}
    </AppContext.Provider>
  );
};
