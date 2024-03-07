import React, { useState, useEffect } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Accordion, AccordionSummary, AccordionDetails, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';
import GetAllOrders from './GetAllOrders';
import GetAllUsers from './GetAllUsers';
import AddProduct from '../pages/AddProduct';
import DeleteProduct from './DeleteProduct';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminView({ productData, fetchData }) {
    const [products, setProducts] = useState([]);
    const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);

    const handleAddProductClick = () => {
        setOpenAddProductDialog(true);
    };

    const handleAddProductClose = () => {
        fetchData();
        setOpenAddProductDialog(false);
    };

    const handleDeleteProduct = (productId) => {
        setDeleteProductId(productId);
    };

    useEffect(() => {
        const productArr = productData.map((product) => (
            <TableRow key={product._id}>
                <TableCell textAlign="center">{product._id}</TableCell>
                <TableCell textAlign="center">{product.name}</TableCell>
                <TableCell textAlign="center">{product.category}</TableCell>
                <TableCell textAlign="center">{product.description}</TableCell>
                <TableCell textAlign="center">&#8369;{product.price.toLocaleString()}.00</TableCell>
                <TableCell className={product.isAvailable ? "text-success" : "text-danger"} textAlign="center">
                    {product.isAvailable ? "Available" : "Unavailable"}
                </TableCell>
                <TableCell textAlign="center">
                    <EditProduct product={product._id} fetchData={fetchData} />
                </TableCell>
                <TableCell textAlign="center">
                    <ArchiveProduct className="btn btn-danger" product={product._id} isAvailable={product.isAvailable} fetchData={fetchData} />
                </TableCell>
                <TableCell textAlign="center">
                    <DeleteProduct fetchData={fetchData} productId={product._id} />
                </TableCell>
            </TableRow>
        ));

        setProducts(productArr);
    }, [productData, fetchData]);

    return (
        <>
            <h2 className="text-center my-4">Dashboard</h2>
            <Accordion sx={{ backgroundColor: '#1976D3', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Products</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table striped bordered hover responsive>
                            <TableHead>
                                <TableRow sx={{ textAlign: 'center' }}>
                                    <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Category</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Description</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Price</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Availability</TableCell>
                                    <TableCell colSpan="3" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products}
                                <TableRow>
                                    <TableCell colSpan={9}>
                                        <Grid container justifyContent="center">
                                            <Grid item xs={12}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleAddProductClick}
                                                    sx={{ width: '100%' }}
                                                >
                                                    Add New Product
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                                <AddProduct
                                    openDialog={openAddProductDialog}
                                    handleCloseDialog={handleAddProductClose}
                                />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
            <hr />
            <Accordion sx={{ backgroundColor: '#1976D3', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Orders</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <GetAllOrders />
                </AccordionDetails>
            </Accordion>
            <hr />
            <Accordion sx={{ backgroundColor: '#1976D3', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Users</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <GetAllUsers />
                </AccordionDetails>
            </Accordion>
            <br/>
        </>
    );
}
