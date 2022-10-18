import React from 'react'
import { CartListContext } from '../../../ctx/CartListContext';
import { useContext, useRef } from 'react';

const CartProduct = ({ product }) => {
    const { cartList, setCartList } = useContext(CartListContext);
    const productTitle = product[0];
    const productPrice = parseInt(product[1].price);
    const productAmount = product[1].amount;
    const decreaseAmount = useRef();
    const increaseAmount = useRef();


    const updateMealAmount = (operator) => {
        switch (operator) {
            case '-':
                setCartList(products => {
                    products[productTitle].amount--;
                    if (products[productTitle].amount === 0) delete products[productTitle];
                    sessionStorage.setItem('cart', JSON.stringify({ ...products }));
                    return { ...products };
                })
                break;
            case '+':
                setCartList(products => {
                    products[productTitle].amount++;
                    sessionStorage.setItem('cart', JSON.stringify({ ...products }));
                    return { ...products };
                })
                break;
        };
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'left' }}>
                    <h3>{productTitle}</h3>
                    <span>${productPrice.toFixed(2)}</span>
                    <span style={{ marginLeft: 55, border: '1px solid #fff' }}>x{productAmount}</span>
                </div>
                <div style={{ margin: 'auto 0' }}>
                    <button ref={decreaseAmount} onClick={() => { updateMealAmount(decreaseAmount.current.innerText) }}>-</button>
                    <button ref={increaseAmount} onClick={() => { updateMealAmount(increaseAmount.current.innerText) }} style={{ marginLeft: 5 }}>+</button>
                </div>
            </div>
            <hr />
        </>
    )
}

export default CartProduct;