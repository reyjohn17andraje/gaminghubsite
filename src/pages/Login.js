import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { Container, Paper, TextField, Button, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const authenticate = (e) => {
        e.preventDefault();
        fetch(`https://gaminghub-2.onrender.com/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (typeof data.access !== 'undefined') {
                    localStorage.setItem('token', data.access);
                    retrieveUserDetails(data.access);

                    Swal.fire({
                        title: 'Login Successful',
                        icon: 'success',
                        text: 'Welcome to Gaming Hub!',
                        timer: 10000,
                    });
                    navigate('/products');
                } else if (data.error === 'No Email Found') {
                    Swal.fire({
                        title: 'Email not found.',
                        icon: 'error',
                        text: 'Check the email you provided.',
                        timer: 10000,
                    });
                } else {
                    Swal.fire({
                        title: 'Authentication failed',
                        icon: 'error',
                        text: 'Check your login details and try again.',
                        timer: 10000,
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Failed to log in. Please try again.',
                    timer: 10000,
                });
            });

        setEmail('');
        setPassword('');
    };

    const retrieveUserDetails = (token) => {
        fetch(`https://gaminghub-2.onrender.com/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUser({
                    id: data.user._id,
                    isAdmin: data.user.isAdmin,
                });
            });
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome to Gaming Hub!
                </Typography>
                <form onSubmit={(e) => authenticate(e)}>
                    <TextField
                        label="Email address"
                        variant="outlined"
                        fullWidth
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        style={{ marginTop: '20px' }}
                    >
                        Submit
                    </Button>
                </form>
                <Typography variant="body1" align="center" style={{ marginTop: '10px' }}>
                    Need an account?{' '}
                    <MuiLink
                        component={RouterLink}
                        to="/register"
                        style={{ textDecoration: 'underline', cursor: 'pointer', color: 'inherit' }}
                    >
                        Register here
                    </MuiLink>
                </Typography>
            </Paper>
        </Container>
    );
}
