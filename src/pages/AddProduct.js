import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AddProduct({ openDialog, handleCloseDialog }) {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [product, setProduct] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        src: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleSrcChange = (e) => {
        setProduct((prevProduct) => ({ ...prevProduct, src: e.target.value }));
    };

    const createProduct = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://gaminghub-2.onrender.com/products/addproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(product),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: data.message,
                    timer: 5000,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.error || 'Failed to add the product.',
                    timer: 5000,
                });
            }
        } catch (error) {
            handleCloseDialog();
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: "Successfully added the product.",
                timer: 5000,
            });
        }
    };

    return user.isAdmin ? (
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="xs">
            <DialogTitle>Add Product</DialogTitle>
            <DialogContent>
                <form onSubmit={createProduct}>
                    {Object.entries(product).map(([key, value]) => (
                        <TextField
                            key={key}
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            type={key === 'price' ? 'number' : 'text'}
                            placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                            required
                            fullWidth
                            value={value}
                            onChange={handleInputChange}
                            name={key}
                            margin="normal"
                        />
                    ))}
                    {product.src && (
                        <img src={product.src} alt="Product Preview" style={{ width: '100%', marginTop: '10px' }} />
                    )}
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                    Cancel
                </Button>
                <Button type="submit" onClick={createProduct} color="primary" variant="contained">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    ) : (
        <Navigate to="/products" />
    );
}
