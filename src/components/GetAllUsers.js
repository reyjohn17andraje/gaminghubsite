import React, { useState, useEffect } from 'react';
import { Table, Button, Paper, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import Swal from 'sweetalert2';

export default function GetAllUsers() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`https://gaminghub-2.onrender.com/users/getusers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();

            if (Array.isArray(data.users)) {
                setUsers(data.users);
            } else {
                setUsers([]);
            }
        } catch (error) {
            setUsers([]);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChangeToAdmin = async (userId) => {
        try {
            const response = await fetch(`https://gaminghub-2.onrender.com/users/${userId}/set-as-admin`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update user role');
            }

            fetchUsers();

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'User role updated to Admin successfully!',
                timer: 10000,
            });
        } catch (error) {
            if (error.message.includes('already admin')) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Cannot Change to Admin',
                    text: 'The user is already an admin.',
                    timer: 10000,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Error updating user role: ${error.message}`,
                    timer: 10000,
                });
            }
        }
    };

    const handleRoleChangeToNonAdmin = async (userId) => {
        try {
            const response = await fetch(`https://gaminghub-2.onrender.com/users/${userId}/remove-admin`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update user role');
            }

            fetchUsers();

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'User role updated to Non-Admin successfully!',
                timer: 10000,
            });
        } catch (error) {
            if (error.message.includes('already non-admin')) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Cannot Change to Non-Admin',
                    text: 'The user is already a non-admin.',
                    timer: 10000,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Error updating user role: ${error.message}`,
                    timer: 10000,
                });
            }
        }
    };

    return (
        <div className="text-center">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ textAlign: 'center' }}>
                            <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>User ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Firstname</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Lastname</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Address</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Role</TableCell>
                            <TableCell colSpan="2" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user._id}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.address}</TableCell>
                                <TableCell>{user.isAdmin ? 'Admin' : 'Non-Admin'}</TableCell>
                                <TableCell>
                                <Button
                                    onClick={() => handleRoleChangeToAdmin(user._id)}
                                    variant="contained"
                                    color="success"
                                >
                                    Admin
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    onClick={() => handleRoleChangeToNonAdmin(user._id)}
                                    variant="contained"
                                    color="error"
                                >
                                    Non-Admin
                                </Button>
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
