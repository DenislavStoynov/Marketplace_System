const DeletePopUp = ({ setPopUpIsVisible, productToDelete, localKey, products, setProducts, user, setTotalProducts}) => {

    const closePopUp = () => {
        setPopUpIsVisible(false);
    };

    const deleteProduct = async () => {
        const copyProducts = products.filter(product => product.id !== productToDelete.id);
        await fetch(`https://market-place-31e77-default-rtdb.firebaseio.com/users/${localKey}.json`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: user.id,
                username: user.username,
                password: user.password,
                products: copyProducts
            })
        });
        setProducts(copyProducts);
        setTotalProducts(prevProducts => prevProducts.filter(product => product.id !== productToDelete.id));
        closePopUp();
    };

    return (
        <div style={{ position: 'absolute', width: '35%', left: '25%', top: '25%', padding: '25px 55px', backgroundColor: '#808080' }}>
            <h3 style={{ textAlign: 'center', color: '#ff0000' }}>Are you sure you want to delete this product?</h3>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={deleteProduct}>OK</button>
                <button onClick={closePopUp}>CLOSE</button>
            </div>
        </div>
    )
};

export default DeletePopUp;