const HomepageProduct = ({ product }) => {
    return (
        <div onClick={() => {console.log(product)}}>{product.title}</div>
    )
};

export default HomepageProduct;