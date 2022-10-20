import React, { useRef, useState, useEffect, useContext } from 'react';
import { CartListContext } from '../../ctx/CartListContext';

// static URL => https://market-place-31e77-default-rtdb.firebaseio.com/users/

const Checkout = ({ setIsCartOpen }) => {
    const [isPurchasing, setIsPurchasing] = useState(null);
    const { cartList, setCartList } = useContext(CartListContext);
    const isCartValid = sessionStorage.getItem('cart');
    const email = useRef();
    const name = useRef();
    const address = useRef();
    const phone = useRef();

    useEffect(() => {
        setIsCartOpen(false);
    }, []);

    const placeOrder = async (event) => {
        event.preventDefault();
        const el = Object.entries(cartList);
        for (let i = 0; i < el.length; i++) {
            const response = await fetch(`https://market-place-31e77-default-rtdb.firebaseio.com/users/${el[i][1].sellerKey}.json`);
            const data = await response.json();
            await fetch(`https://market-place-31e77-default-rtdb.firebaseio.com/users/${el[i][1].sellerKey}.json`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orders: !data.orders ? [{
                        productTitle: el[i][0],
                        productPrice: parseInt(el[i][1].price),
                        amount: el[i][1].amount,
                        client: {
                            name: name.current.value,
                            email: email.current.value,
                            address: address.current.value,
                            phone: phone.current.value
                        }
                    }] : [...data.orders, {
                        productTitle: el[i][0],
                        productPrice: parseInt(el[i][1].price),
                        amount: el[i][1].amount,
                        client: {
                            name: name.current.value,
                            email: email.current.value,
                            address: address.current.value,
                            phone: phone.current.value
                        }
                    }]
                })
            })
        };
        setCartList({});
        email.current.value = '';
        name.current.value = '';
        address.current.value = '';
        phone.current.value = '';
    }


    return (
        <div>
            {(!isCartValid || isCartValid.length <= 2) && <h1>Your cart is empty!</h1>}
            {isCartValid && isCartValid.length > 2 &&
                <form onSubmit={placeOrder} style={{ display: 'flex', gap: 15, flexDirection: 'column', width: '50%', margin: '0 auto' }}>
                    <h1>Checkout:</h1>
                    <input type="email" placeholder='Email address...(mandatory)' ref={email} required />
                    <input type="text" placeholder='First and Last name...(mandatory)' ref={name} required />
                    <input type="text" placeholder='Address...(mandatory)' ref={address} required />
                    <input type="text" placeholder='Phone number...(optional)' ref={phone} required />
                    <button type="submit">Order</button>
                </form>}
        </div>
    );
};

export default Checkout;