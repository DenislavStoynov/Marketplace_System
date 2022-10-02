import { createContext, useState, useEffect } from "react";

export const TotalProductsContext = createContext();

export const TotalProductsContextProvider = ({ children }) => {
    const [totalProducts, setTotalProducts] = useState([]);

    useEffect(() => {
        const updateTotalProducts = async () => {
            const response = await fetch('https://market-place-31e77-default-rtdb.firebaseio.com/users.json');
            const data = await response.json();
            setTotalProducts(Object.values(data).map(p => p.products));
        }

        (async () => { await updateTotalProducts(); })();
    }, []);

    useEffect(() => {console.log("Changed!!!!!")}, [totalProducts])
    return (
        <TotalProductsContext.Provider value={{ totalProducts, setTotalProducts }}>
            {children}
        </TotalProductsContext.Provider>
    )
};