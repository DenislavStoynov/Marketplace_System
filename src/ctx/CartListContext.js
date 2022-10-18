import { createContext, useState, useEffect } from "react";

export const CartListContext = createContext();

export const CartListContextProvider = ({ children }) => {
    const [cartList, setCartList] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    const calculateTotalPrice = () => {
        return Object.values(cartList).map(x => x.price * x.amount).reduce((x, y) => x + y, 0);
    }

    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [cartList])

    return (
        <CartListContext.Provider value={{ cartList, setCartList, totalPrice, setTotalPrice }}>
            {children}
        </CartListContext.Provider>
    );
};