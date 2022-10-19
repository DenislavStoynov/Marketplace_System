import React, { useEffect } from 'react';

const Checkout = ({ setIsCartOpen }) => {
    const isCartValid = sessionStorage.getItem('cart');

    useEffect(() => {
        setIsCartOpen(false);
    }, [])

    return (
        <div>
            {(!isCartValid || isCartValid.length <= 2) && <h1>Your cart is empty!</h1>}
            {isCartValid && isCartValid.length > 2 &&
                <form style={{ display: 'flex', gap: 15, flexDirection: 'column', width: '50%', margin: '0 auto' }}>
                    <h1>Checkout:</h1>
                    <input type="email" placeholder='Email address...(mandatory)' required />
                    <input type="text" placeholder='First and Last name...(optional)' />
                    <input type="text" placeholder='Address...(mandatory)' required />
                    <input type="text" placeholder='Phone number...(optional)' required />
                    <button type="submit">Order</button>
                </form>}
        </div>
    );
};

export default Checkout;