import { useContext, useRef, useState, useEffect } from "react";
import { LoggedContext } from "../../ctx/LoggedContext";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
    const { setIsLoggedIn } = useContext(LoggedContext);
    const key = localStorage.key(0)
    const user = JSON.parse(localStorage.getItem(key));
    const history = useHistory();
    const productTitle = useRef();
    const productDescription = useRef();
    const productPrice = useRef();

    const logOut = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        history.push('/login');
    };

    const getProductsList = async () => {
        const response = await fetch(`https://market-place-31e77-default-rtdb.firebaseio.com/users/${key}.json`);
        const data = await response.json();
        return data.products;
    }

    const addProduct = async (event) => {
        event.preventDefault();
        const res = await getProductsList();
        const productsList = Array.isArray(res) ? res : null;
        await fetch(`https://market-place-31e77-default-rtdb.firebaseio.com/users/${key}.json`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: user.id,
                username: user.username,
                password: user.password,
                products: !productsList ? [{
                    id: Math.random(),
                    title: productTitle.current.value,
                    description: productDescription.current.value,
                    price: productPrice.current.value
                }] : [...productsList, {
                    id: Math.random(),
                    title: productTitle.current.value,
                    description: productDescription.current.value,
                    price: productPrice.current.value
                }]
            })
        });
    }

    return (
        <div>
            <span style={{ fontSize: '29px', fontWeight: 'bold' }}>Welcome to your dashboard, {user.username}!</span>
            <button style={{ marginBottom: 35 }} onClick={logOut}>Logout</button>
            <section style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div>
                    <h3>Your Products:</h3>
                </div>
                <div>
                    <h3>Add Product:</h3>
                    <form onSubmit={addProduct} style={{ display: 'flex', flexDirection: 'column' }}>
                        <input type='text' placeholder='Enter product title...' ref={productTitle} />
                        <textarea rows={5} cols={35} placeholder='Enter product description...' ref={productDescription} />
                        <input type='number' placeholder='Enter product price($)...' ref={productPrice} />
                        <button>Add Product</button>
                    </form>
                </div>
            </section>
        </div>
    )
};

export default Dashboard;