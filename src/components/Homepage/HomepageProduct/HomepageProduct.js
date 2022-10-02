const HomepageProduct = ({ product }) => {
    return (
        <div onClick={() => {console.log(product)}}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>{product.price}$</p>
            <button>Add To Cart</button>
        </div>
    )
};

export default HomepageProduct;