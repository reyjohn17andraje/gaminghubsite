import React, { useContext, useState, useEffect } from 'react';
import { Grid, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Modal, Box, TextField } from '@mui/material';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Profile() {
    const { user } = useContext(UserContext);
    const [details, setDetails] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);
    const [updatedDetails, setUpdatedDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNo: '',
        address: '',
    });

    const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isResetPasswordButtonDisabled, setResetPasswordButtonDisabled] = useState(true);

    const [myOrdersModalOpen, setMyOrdersModalOpen] = useState(false);
    const [userOrders, setUserOrders] = useState([]);

    const fetchProfile = () => {
        fetch(`https://gaminghub-2.onrender.com/users/details`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (typeof data.user !== 'undefined') {
                    setDetails(data.user);
                } else if (data.error === 'User not found') {
                    showError('User not found');
                } else {
                    showError('Something went wrong');
                }
            });
    };

    const showError = (title) => {
        Swal.fire({
            title,
            icon: 'error',
            text: 'Something went wrong, kindly contact us for assistance.',
        });
    };

    const handleModalOpen = () => {
        setModalOpen(true);
        setUpdatedDetails({
            firstName: details.firstName,
            lastName: details.lastName,
            email: details.email,
            mobileNo: details.mobileNo,
            address: details.address,
        });
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleUpdateDetails = () => {
        fetch('https://gaminghub-2.onrender.com/users/updatedetails', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedDetails),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'User Updated Successfully') {
                    fetchProfile();
                    setModalOpen(false);
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'User details updated successfully.',
                    });
                } else {
                    showError('Failed to update user details');
                }
            });
    };

    const handleResetPasswordModalOpen = () => {
        setResetPasswordModalOpen(true);
        setNewPassword('');
        setConfirmNewPassword('');
        setResetPasswordButtonDisabled(true);
    };

    const handleResetPasswordModalClose = () => {
        setResetPasswordModalOpen(false);
    };

    const handleNewPasswordChange = (event) => {
        const { value } = event.target;
        setNewPassword(value);
        validatePasswordsMatch(value, confirmNewPassword);
    };

    const handleConfirmNewPasswordChange = (event) => {
        const { value } = event.target;
        setConfirmNewPassword(value);
        validatePasswordsMatch(newPassword, value);
    };

    const validatePasswordsMatch = (newPassword, confirmNewPassword) => {
        setResetPasswordButtonDisabled(newPassword !== confirmNewPassword);
    };

    const handleResetPassword = () => {
        fetch('https://gaminghub-2.onrender.com/users/updatepassword', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ newPassword }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'Password Reset Successfully') {
                    setResetPasswordModalOpen(false);
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'Password reset successfully.',
                    });
                } else {
                    showError('Failed to reset password');
                }
            });
    };

    const handleMyOrdersModalOpen = () => {
        setMyOrdersModalOpen(true);
        fetchMyOrders();
    };

    const handleMyOrdersModalClose = () => {
        setMyOrdersModalOpen(false);
    };

    const fetchMyOrders = () => {
        fetch('https://gaminghub-2.onrender.com/orders/myorders', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.orders) {
                    setUserOrders(data.orders);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        user.id === null ? (
            <Navigate to="/products" />
        ) : (
            <Grid container justifyContent="center" style={{ padding: '20px' }}>
                <Grid item xs={12} md={8} lg={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h4" align="center" gutterBottom>
                            User Profile
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1" style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                                                Field
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1" style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                                                Details
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Full Name</TableCell>
                                        <TableCell>{`${details.firstName} ${details.lastName}`}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell>{details.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Mobile No</TableCell>
                                        <TableCell>{details.mobileNo}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Address</TableCell>
                                        <TableCell>{details.address}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <Button variant="contained" color="primary" onClick={handleModalOpen} style={{ marginRight: '10px' }}>
                                Update Details
                            </Button>

                            <Button variant="contained" color="primary" onClick={handleResetPasswordModalOpen} style={{ marginRight: '10px' }}>
                                Reset Password
                            </Button>

                            <Button variant="contained" color="primary" onClick={handleMyOrdersModalOpen}>
                                Get Orders
                            </Button>
                        </div>

                        <Modal open={isModalOpen} onClose={handleModalClose}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '80%',
                                    maxWidth: '400px',
                                    bgcolor: 'background.paper',
                                    border: '2px solid #000',
                                    boxShadow: 24,
                                    p: 4,
                                }}
                            >
                                <Typography variant="h6" gutterBottom>
                                    Update User Details
                                </Typography>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    value={updatedDetails.firstName}
                                    onChange={handleInputChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    value={updatedDetails.lastName}
                                    onChange={handleInputChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={updatedDetails.email}
                                    onChange={handleInputChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Mobile No"
                                    name="mobileNo"
                                    value={updatedDetails.mobileNo}
                                    onChange={handleInputChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Address"
                                    name="address"
                                    value={updatedDetails.address}
                                    onChange={handleInputChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <Button variant="contained" color="primary" onClick={handleUpdateDetails} style={{ marginTop: '20px' }}>
                                    Update
                                </Button>
                            </Box>
                        </Modal>

                        <Modal open={resetPasswordModalOpen} onClose={handleResetPasswordModalClose}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '80%',
                                    maxWidth: '400px',
                                    bgcolor: 'background.paper',
                                    border: '2px solid #000',
                                    boxShadow: 24,
                                    p: 4,
                                }}
                            >
                                <Typography variant="h6" gutterBottom>
                                    Reset Password
                                </Typography>
                                <TextField
                                    label="New Password"
                                    type="password"
                                    value={newPassword}
                                    onChange={handleNewPasswordChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Confirm New Password"
                                    type="password"
                                    value={confirmNewPassword}
                                    onChange={handleConfirmNewPasswordChange}
                                    fullWidth
                                    margin="normal"
                                    error={newPassword !== confirmNewPassword}
                                    helperText={newPassword !== confirmNewPassword ? 'Passwords do not match' : ''}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleResetPassword}
                                    disabled={isResetPasswordButtonDisabled}
                                    style={{ marginTop: '20px' }}
                                >
                                    Reset Password
                                </Button>
                            </Box>
                        </Modal>

                        <Modal open={myOrdersModalOpen} onClose={handleMyOrdersModalClose}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '80%',
                                    maxWidth: '600px',
                                    bgcolor: 'background.paper',
                                    border: '2px solid #000',
                                    boxShadow: 24,
                                    p: 4,
                                }}
                            >
                                <Typography variant="h6" gutterBottom>
                                    My Orders
                                </Typography>
                                {userOrders.length > 0 ? (
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Product/s Name</TableCell>
                                                    <TableCell>Date</TableCell>
                                                    <TableCell>Total Amount</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {userOrders.map((order) => (
                                                    <TableRow key={order._id}>
                                                        <TableCell>
                                                            {order.cartItems.map(item => (
                                                                <div key={item.productId} className="text-center">{item.name}</div>
                                                            ))}
                                                        </TableCell>
                                                        <TableCell>{new Date(order.purchasedOn).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        })}
                                                        </TableCell>
                                                        <TableCell>&#8369;{order.totalAmount.toLocaleString()}.00</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                ) : (
                                    <Typography variant="body1" color="textSecondary" align="center">
                                        No orders made
                                    </Typography>
                                )}
                            </Box>
                        </Modal>
                    </Paper>
                </Grid>
            </Grid>
        )
    );
}
