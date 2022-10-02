import { useState, useEffect } from 'react';
import HomepageProduct from './HomepageProduct/HomepageProduct';

const Homepage = ({ userList, totalProducts, setTotalProducts }) => {
    const productsPerPage = totalProducts.length > 0 && totalProducts.length <= 4 ? totalProducts.length : 4;
    const totalPages = Math.ceil(totalProducts.length / productsPerPage);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [totalProductsCache, setTotalProductsCache] = useState([]);

    const updateSearchInput = (event) => {
        setSearchInput(event.target.value);
        setTotalProducts(totalProductsCache.filter(product => product.title.toLowerCase().includes(event.target.value.toLowerCase())));
        setCurrentPage(1);
    };

    const createPages = () => {
        setPages([]);
        for (let i = 1; i <= totalPages; i++) {
            setPages(p => [...p, i]);
        }
    };

    useEffect(() => {
        setTotalProductsCache(totalProducts);
    }, [userList]);

    useEffect(() => {
        createPages();
    }, [totalProducts, searchInput]);

    const displayProducts = () => {
        const end = productsPerPage * currentPage;
        const start = end - productsPerPage;
        const products = currentPage === pages.length ? totalProducts.slice(start) : totalProducts.slice(start, end);
        if (searchInput) return products.map(product => <HomepageProduct key={product.id} product={product} />)
        return products.map(product => <HomepageProduct key={product.id} product={product} />);
    };

    const changePage = (page) => {
        setCurrentPage(page);
    };

    const boldedPage = (page) => {
        return page === currentPage;
    };

    const displayPaginationNumbers = () => {
        return pages.map(p => <span style={{ fontWeight: boldedPage(p) ? 'bold' : 'normal', marginRight: 15, cursor: 'pointer' }} key={p} onClick={() => { changePage(p) }}>{p}</span>)
    };

    return (
        <div>
            <h1>Welcome to our home page</h1>
            <hr width={55} style={{ border: '1px solid #000' }} />
            <h2>Our Products</h2>
            <input type='text' placeholder='Enter a product...' onChange={updateSearchInput} />
            {!searchInput && totalProducts.length === 0 && <p>Loading...</p>}
            {totalProducts.length > 0 && <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>{displayProducts()}</div>}
            {searchInput && totalProducts.length === 0 && <p>No results!</p>}
            {pages && displayPaginationNumbers()}
        </div>
    )
};

export default Homepage;