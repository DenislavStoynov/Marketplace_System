import { useState, useEffect } from 'react';
import HomepageProduct from './HomepageProduct/HomepageProduct';

const Homepage = ({ totalProducts, setTotalProducts }) => {
    const productsPerPage = totalProducts.length > 0 && totalProducts.length <= 4 ? totalProducts.length : 4;
    const totalPages = Math.ceil(totalProducts.length / productsPerPage);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');

    const updateSearchInput = (event) => {
        setSearchInput(event.target.value);
        setTotalProducts(totalProducts.filter(product => product.title.toLowerCase().includes(searchInput.toLowerCase())));
    };

    const createPages = () => {
        setPages([]);
        console.log(totalPages, totalProducts);
        for (let i = 1; i <= totalPages; i++) {
            setPages(p => [...p, i]);
        }
    };

    useEffect(() => {
        createPages();
    }, [totalProducts, searchInput]);

    const displayProducts = () => {
        const start = (productsPerPage * currentPage) - productsPerPage;
        const end = productsPerPage * currentPage;
        const lastPageEnd = end - productsPerPage;
        const products = currentPage === pages.length ? totalProducts.slice(lastPageEnd) : totalProducts.slice(start, end);
        // if (searchInput) return products.filter(product => product.title.toLowerCase().includes(searchInput.toLowerCase())).map(product => <HomepageProduct key={product.id} product={product} />)
        return products.map(product => <HomepageProduct key={product.id} product={product} />);
    };

    const changePage = (page) => {
        setCurrentPage(page);
    };

    const boldedPage = (page) => {
        return page === currentPage;
    }

    return (
        <div>
            <h1>Welcome to our home page</h1>
            <hr width={55} style={{ border: '1px solid #000' }} />
            <h2>Our Products</h2>
            <input type='text' placeholder='Enter a product...' onChange={updateSearchInput} />
            {totalProducts.length === 0 && <p>Loading...</p>}
            {totalProducts.length > 0 && displayProducts()}
            {pages && pages.map(p => <span style={{ fontWeight: boldedPage(p) ? 'bold' : 'normal', marginRight: 15, cursor: 'pointer' }} key={p} onClick={() => { changePage(p) }}>{p}</span>)}
        </div>
    )
};

export default Homepage;