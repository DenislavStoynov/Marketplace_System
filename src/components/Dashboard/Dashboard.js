import { useContext, useRef, useState, useEffect } from "react";
import { LoggedContext } from "../../ctx/LoggedContext";
import { useHistory } from "react-router-dom";
import Product from "./Products/Product";

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const { setIsLoggedIn } = useContext(LoggedContext);
    const key = localStorage.key(0);
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
        setProducts(data.products);
        return data.products;
    };

    useEffect(() => {
        const assignProductsToState = async () => {
            const res = await getProductsList();
            setProducts(res);
        };

        (async () => {
            await assignProductsToState();
        })();
    }, [])

    const addProduct = async (event) => {
        event.preventDefault();
        await fetch(`https://market-place-31e77-default-rtdb.firebaseio.com/users/${key}.json`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: user.id,
                username: user.username,
                password: user.password,
                products: !products ? [{
                    id: Math.random(),
                    title: productTitle.current.value,
                    description: productDescription.current.value,
                    price: productPrice.current.value
                }] : [...products, {
                    id: Math.random(),
                    title: productTitle.current.value,
                    description: productDescription.current.value,
                    price: productPrice.current.value
                }]
            })
        });
        const res = await getProductsList();
        setProducts(res);
    };

    const extractProducts = () => {
        return products.map(product => <Product key={product.id} product={product} />)
    }

    return (
        <div>
            <span style={{ fontSize: '29px', fontWeight: 'bold' }}>Welcome to your dashboard, {user.username}!</span>
            <button style={{ marginBottom: 35 }} onClick={logOut}>Logout</button>
            <section style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div>
                    <h3>Your Products:</h3>
                    {Array.isArray(products) && extractProducts()}
                    {!Array.isArray(products) && <p>You have no products yet</p>}
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