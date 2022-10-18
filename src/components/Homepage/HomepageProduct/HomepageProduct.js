import { CartListContext } from "../../../ctx/CartListContext";
import { useContext } from "react";

const HomepageProduct = ({ product }) => {
    const { setCartList } = useContext(CartListContext);
    const newProduct = product.title;
    const addedProduct = {}
    addedProduct[newProduct] = { price: product.price, amount: 1 };

    const addProductToCartList = () => {
        setCartList(prevProducts => {
            return Object.keys(prevProducts).length === 0 ? addedProduct : { ...prevProducts, ...addedProduct };
        });
    };

    return (
        <div>
            <img src={product.images ? product.images : null} width={85} height={85} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>{product.price}$</p>
            <button onClick={addProductToCartList}>Add To Cart</button>
        </div>
    )
};

export default HomepageProduct;