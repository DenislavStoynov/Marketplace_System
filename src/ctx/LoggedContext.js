import { createContext, useState, useEffect } from "react";

export const LoggedContext = createContext();

export const LoggedContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    return (
        <LoggedContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </LoggedContext.Provider>
    )
};