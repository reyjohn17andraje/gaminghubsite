import React, { useState, useEffect } from 'react';
import { Table, Paper, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import Swal from 'sweetalert2';

export default function AllOrdersComponent() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`https://gaminghub-2.onrender.com/orders/allorders`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setOrders(data.orders);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to fetch orders. Please try again later.',
                });
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="text-center">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ textAlign: 'center' }}>
                            <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Order ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>User ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Product Names</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Total Amount</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Purchased On</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(order => (
                            <TableRow key={order._id}>
                                <TableCell>{order._id}</TableCell>
                                <TableCell>{order.userId}</TableCell>
                                <TableCell>
                                    {order.cartItems.map(item => (
                                        <div key={item.productId} className="text-center">{item.name}</div>
                                    ))}
                                </TableCell>
                                <TableCell>&#8369;{order.totalAmount.toLocaleString()}.00</TableCell>
                                <TableCell className={getStatusColor(order.status)}>
                                    {order.status}
                                </TableCell>
                                <TableCell>
                                    {new Date(order.purchasedOn).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

    function getStatusColor(status) {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'text-warning';
            case 'placed':
                return 'text-success';
            default:
                return 'text-danger';
        }
    }
}
