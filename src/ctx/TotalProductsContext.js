import { createContext, useState, useEffect } from "react";

export const TotalProductsContext = createContext();

export const TotalProductsContextProvider = ({ children }) => {
    // code...
    return (
        <TotalProductsContext.Provider value={{}}>
            {children}
        </TotalProductsContext.Provider>
    )
};