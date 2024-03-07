import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductSearch from './ProductSearch';
import SearchProductByPrice from './SearchProductByPrice';
import { Container, Typography, Button, Grid, Breadcrumbs, Link, Pagination } from '@mui/material';

export default function UserView({ productData }) {
    const [products, setProducts] = useState([]);
    const [showProductSearch, setShowProductSearch] = useState(false);
    const [showSearchByPrice, setShowSearchByPrice] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    useEffect(() => {
        setProducts((prevProducts) => {
            const productArr = productData.map((product) => {
                if (product.isAvailable === true) {
                    return <ProductCard productProp={product} key={product._id} />;
                } else {
                    return null;
                }
            });
            return productArr;
        });
    }, [productData]);

    const toggleProductSearch = () => {
        setShowProductSearch((prev) => !prev);
        setShowSearchByPrice(false);
    };

    const toggleSearchByPrice = () => {
        setShowSearchByPrice((prev) => !prev);
        setShowProductSearch(false);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <Container style={{ padding: '20px' }}>
            <Grid container justifyContent="center">
                <Typography variant="h4" className="mt-5">
                    Products
                </Typography>
            </Grid>
            <br />
            <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={toggleProductSearch}>
                        Toggle Product Search
                        {showProductSearch ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
                                <path d="M1 14l7-7 7 7H1z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path d="M1 2l7 7 7-7H1z" />
                            </svg>
                        )}
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={toggleSearchByPrice}>
                        Toggle Search by Price
                        {showSearchByPrice ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
                                <path d="M1 14l7-7 7 7H1z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path d="M1 2l7 7 7-7H1z" />
                            </svg>
                        )}
                    </Button>
                </Grid>
            </Grid>
            <br />
            <Grid container justifyContent="center">
                <Grid item xs={12}>
                    {(showProductSearch || showSearchByPrice)}
                    {showProductSearch && <ProductSearch />}
                    {showSearchByPrice && <SearchProductByPrice />}
                </Grid>
            </Grid>
            <br />
            <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: '10px' }}>
                <Link color="inherit" href="/">
                    Home
                </Link>
                <Typography color="textPrimary">Products</Typography>
            </Breadcrumbs>
            <hr />
            <Grid container fluid spacing={5}>{currentProducts}</Grid>
            <br />
            <Grid container justifyContent="center" className="mt-3" style={{ marginBottom: '20px' }}>
                <Pagination
                    count={Math.ceil(products.length / productsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Grid>
        </Container>
    );
}
