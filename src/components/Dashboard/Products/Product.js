const Product = ({product}) => {
    return (
        <div>
            <p><b>Title: </b>{product.title}</p>
            <p><b>Description: </b>{product.description}</p>
            <p><b>Price: </b>{product.price}$</p>
            <hr />
        </div>
    )
};

export default Product;