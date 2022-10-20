import React, { useState, useEffect } from 'react';

const selectButtonStyles = {
    padding: '2px 5px 5px 5px',
    fontSize: '14px',
    backgroundColor: '#43b2f7',
    color: '#fff',
    cursor: 'pointer'
};

const Product = ({ product, setProducts, products, setPopUpIsVisible, setProductToDelete, localKey, user }) => {
    const key = getKeyByValue(products, product);
    const openPopUp = () => {
        setPopUpIsVisible(true);
        setProductToDelete(product);
    };

    const updateProducts = (result) => {
        setProducts(prevProducts => {
            const res = prevProducts.map(x => {
                if (x.id === product.id) x.images = result;
                return x;
            });
            return [...res];
        })
    };

    const selectImage = (event) => {
        let reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onload = async () => {
            await fetch(`https://market-place-31e77-default-rtdb.firebaseio.com/users/${localKey}/products/${key}.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    images: reader.result,
                    sellerKey: localKey,
                    seller: user.username
                })
            });
            updateProducts(reader.result);
        }
    };

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    };

    return (
        <div>
            {!product.images &&
                <div>
                    <label htmlFor={`${product.id}`} style={selectButtonStyles}>Select Image</label>
                    <input style={{ display: 'none' }} id={`${product.id}`} type='file' name='image' accept='' onChange={selectImage} />
                </div>}
            {product.images && <img src={product.images} width={85} height={85} />}
            <p><b>Title: </b>{product.title}</p>
            <p><b>Description: </b>{product.description}</p>
            <p><b>Price: </b>{product.price}$</p>
            <button onClick={openPopUp}>Delete Product</button>
            <hr />
        </div>
    )
};

export default Product;
