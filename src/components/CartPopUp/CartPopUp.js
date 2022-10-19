import React, { useEffect } from 'react';
import { CartListContext } from '../../ctx/CartListContext';
import { useContext } from 'react';
import CartProduct from './CartProduct/CartProduct';
import { Link } from 'react-router-dom';

const CartPopUp = ({ setIsCartOpen }) => {
    const { cartList, totalPrice } = useContext(CartListContext);
    const cartListToArray = Object.entries(cartList);

    const closeCartPopUp = () => {
        setIsCartOpen(false);
    };

    const extractAddedToCartProducts = () => {
        return cartListToArray.map(product => <CartProduct key={Math.random()} product={product} />)
    };

    return (
        <div style={{ position: 'absolute', width: '35%', height: 'auto', top: '35%', left: '35%', padding: '5px 15px', backgroundColor: '#aaa' }}>
            {cartListToArray && extractAddedToCartProducts()}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Total Amount</h2>
                <h2>${totalPrice.toFixed(2)}</h2>
            </div>
            <div style={{ float: 'right' }}>
                <button onClick={closeCartPopUp}>Close</button>
                <Link to='/checkout'><button>Checkout</button></Link>
            </div>
        </div>
    )
};

export default CartPopUp;