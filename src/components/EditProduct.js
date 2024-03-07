import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';

export default function EditCourse({ product, fetchData }) {
    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    const openEdit = (productId) => {
        fetch(`https://gaminghub-2.onrender.com/products/${productId}`)
            .then((res) => res.json())
            .then((data) => {
                setProductId(data.product._id);
                setName(data.product.name);
                setDescription(data.product.description);
                setPrice(data.product.price);
            });
        setShowEdit(true);
    };

    const closeEdit = () => {
        setShowEdit(false);
        setName('');
        setDescription('');
        setPrice(0);
    };

    const editProduct = (e) => {
        e.preventDefault();
        fetch(`https://gaminghub-2.onrender.com/products/${productId}/updateproduct`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'Product updated successfully') {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'Product successfully updated.',
                    });
                    closeEdit();
                    fetchData();
                } else {
                    Swal.fire({
                        title: 'Error',
                        icon: 'error',
                        text: 'Please try again.',
                    });
                    closeEdit();
                    fetchData();
                }
            });
    };

    return (
        <>
            <Button variant="contained" size="small" onClick={() => openEdit(product)}>
                Edit
            </Button>
            <Modal open={showEdit} onClose={closeEdit} center>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" component="div">
                        Edit Product
                    </Typography>
                    <br/>
                    <form onSubmit={editProduct}>
                        <TextField
                            id="productName"
                            label="Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            fullWidth
                        />
                        <br/><br/>
                        <TextField
                            id="productDescription"
                            label="Description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            fullWidth
                        />
                        <br/><br/>
                        <TextField
                            id="productPrice"
                            label="Price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            fullWidth
                        />
                        <br/><br/>
                        <Button variant="contained" onClick={closeEdit} sx={{ mt: 2 }}>
                            Close
                        </Button>
                        <Button type="submit" variant="contained" color="success" sx={{ mt: 2, ml: 2 }}>
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
}
