import React, { useState, useEffect, useContext } from 'react';
import { Button, Typography, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import UserContext from '../UserContext';

export default function Banner({ data }) {
    const { title, content, destination, label } = data;
    const { user } = useContext(UserContext);

    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);

    const fetchData = () => {
        let fetchUrl = user.isAdmin
            ? 'https://gaminghub-2.onrender.com/products/allproducts'
            : 'https://gaminghub-2.onrender.com/products/allactiveproducts';
        fetch(fetchUrl, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((res) => res.json())
        .then((data) => {
            if (typeof data.message !== 'string') {
                setProducts(data);
            } else {
                setProducts([]);
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    };

    const handleProductClick = (productId) => {
        window.location.href = `products/${productId}`;
    };

    return (
        <>
            <div style={{ height: 'auto', width: '100%', maxWidth: '100%' }}>
                <Grid container justifyContent="center" alignItems="center" style={{ height: 'calc(100vh - 64px)' }}>
                    <Grid item xs={12} className="p-5 text-center">
                        <Typography variant="h1" component="div" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h5" component="div" paragraph>
                            <i>{content}</i>
                        </Typography>
                        <Button variant="contained" color="primary" component={Link} to={destination}>
                            {label}
                        </Button>
                    </Grid>
                </Grid>

                <Grid container justifyContent="center" alignItems="center" style={{ height: 'auto', background: '#f0f0f0' }}>
                    <Grid item xs={12} className="p-5 text-center">
                        <h2 className="text-center">Product Gallery</h2>
                        <br />
                        <Carousel animation="slide" index={activeIndex} onRequestChange={setActiveIndex}>
                            {products.map((product, index) => (
                                <Grid key={product.id} item xs={12} sm={12} md={12}>
                                    <Paper elevation={3} style={{ padding: 20, textAlign: 'center', height: '80vh', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ height: '70vh', display: 'flex', alignItems: 'center' }}>
                                            <img
											    src={product.src}
											    alt={product.name}
											    style={{ flex: 1, width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }}
											    onClick={() => handleProductClick(product._id)}
											/>
                                        </div>
                                        <Typography variant="h5" color="black" style={{ marginTop: '10px' }}>
                                            {product.name}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Carousel>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
