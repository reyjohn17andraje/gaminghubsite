import React, { useState } from 'react';
import { TextField, Button, Grid, Card, CardContent, CardMedia, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Box, IconButton } from '@mui/material';
import Swal from 'sweetalert2';
import WarningIcon from '@mui/icons-material/Warning';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ProductSearchByPriceRange() {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    const ProductCard = ({ product }) => {
        const { _id, name, description, price, src } = product;

        const cardStyle = {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '16px',
            margin: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        };

        const imgStyle = {
            objectFit: 'contain',
            width: '100%',
            height: '200px',
        };

        return (
            <Grid item xs={12} sm={12} md={12}>
                <Card style={cardStyle}>
                    <CardMedia component="img" alt={name} image={src} style={imgStyle} />
                    <CardContent>
                        <Typography variant="h6" component="div">
                            {name}
                        </Typography>
                        <hr />
                        <Typography variant="subtitle2" color="textSecondary">
                            Description:
                        </Typography>
                        <Typography variant="body2" paragraph>
                            {description}
                        </Typography>
                        <hr />
                        <Typography variant="subtitle2" color="textSecondary">
                            Price:
                        </Typography>
                        <Typography variant="body1" paragraph>
                            &#8369;{price.toLocaleString()}.00
                        </Typography>
                    </CardContent>
                    <Button variant="contained" color="primary" component={Link} to={`/products/${_id}`}>
                        Details
                    </Button>
                </Card>
            </Grid>
        );
    };

    const handleSearchByPriceRange = async () => {
        try {
            const response = await fetch(`https://gaminghub-2.onrender.com/products/searchbypricerange`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ minPrice, maxPrice }),
            });
            const data = await response.json();
            setSearchResults(data.products);
            setOpenDialog(true);
            setMinPrice('');
            setMaxPrice('');
        } catch (error) {
            console.error('Error searching for products by price range:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Error searching for products by price range: ${error.message}`,
                timer: 10000,
            });
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="minPrice"
                        label="Min Price"
                        variant="outlined"
                        value={minPrice}
                        onChange={(event) => setMinPrice(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="maxPrice"
                        label="Max Price"
                        variant="outlined"
                        value={maxPrice}
                        onChange={(event) => setMaxPrice(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleSearchByPriceRange}>
                        Search
                    </Button>
                </Grid>
            </Grid>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <div style={{ textAlign: 'center' }}>
                    <DialogTitle>Search Results</DialogTitle>
                </div>
                <DialogContent>
                    {searchResults.length === 0 ? (
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <IconButton color="warning" aria-label="warning">
                                <WarningIcon />
                            </IconButton>
                            <Typography variant="h6" color="textSecondary">
                                No Product Found!
                            </Typography>
                        </Box>
                    ) : (
                        <Grid container spacing={3}>
                            {searchResults.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
