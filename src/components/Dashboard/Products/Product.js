const Product = ({product, setPopUpIsVisible, setProductToDelete}) => {
    const openPopUp = () => {
        setPopUpIsVisible(true);
        setProductToDelete(product);
    }
    return (
        <div>
            <p><b>Title: </b>{product.title}</p>
            <p><b>Description: </b>{product.description}</p>
            <p><b>Price: </b>{product.price}$</p>
            <button onClick={openPopUp}>Delete Product</button>
            <hr />
        </div>
    )
};

export default Product;