import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import Swal from 'sweetalert2';

export default function DeleteProduct({ productId, fetchData }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        fetch(`https://gaminghub-2.onrender.com/products/${productId}/deleteproduct/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.status === 200) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error Deleting Product',
                    text: data.error,
                });
            } else {
                
                Swal.fire({
                    icon: 'success',
                    title: 'Product Deleted!',
                    timer: 5000,
                    showConfirmButton: false,
                });

                fetchData();
                handleClose();
            }
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error Deleting Product',
                text: error.message,
            });
        });
    };

    return (
        <>
            <Button variant="contained" size="small" onClick={handleClickOpen} color="error">
                Delete
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete Product</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this product?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" size="small" onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" size="small" onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
                <br />
            </Dialog>
        </>
    );
}
