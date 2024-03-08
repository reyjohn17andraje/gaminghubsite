import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography, Container, FormControl, InputLabel, Input, FormHelperText, Paper, Link as MuiLink } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Register() {
    const { user } = useContext(UserContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const setFormattedMobileNo = (input) => {
        const numericInput = input.replace(/\D/g, '');
        const formattedMobileNo =
            numericInput.length > 10 ? `+63${numericInput.slice(-10)}` : `+63${numericInput}`;
        setMobileNo(formattedMobileNo);
    };

    const registerUser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://gaminghub-2.onrender.com/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    mobileNo,
                    address,
                    password,
                }),
            });

            const data = await response.json();

            if (data.message === 'Registered Successfully') {
                setFirstName('');
                setLastName('');
                setEmail('');
                setMobileNo('');
                setAddress('');
                setPassword('');
                setConfirmPassword('');

                Swal.fire({
                    icon: 'success',
                    title: 'Registration successful',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
                navigate('/products');
            } else if (data.error === 'Email invalid') {
                setError('Email is invalid');
                showErrorAlert();
            } else if (data.error === 'Mobile number invalid') {
                setError('Mobile number is invalid');
                showErrorAlert();
            } else if (data.error === 'Please enter your address') {
                setError('Please enter your address');
                showErrorAlert();
            } else if (data.error === 'Password must be atleast 8 characters') {
                setError('Password must be at least 8 characters');
                showErrorAlert();
            } else {
                setError('Something went wrong.');
                showErrorAlert();
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('Something went wrong.');
            showErrorAlert();
        }
    };

    const showErrorAlert = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        });
    };

    useEffect(() => {
        setIsActive(
            firstName !== '' &&
            lastName !== '' &&
            email !== '' &&
            mobileNo !== '' &&
            address !== '' &&
            password !== '' &&
            confirmPassword !== '' &&
            password === confirmPassword
        );
    }, [firstName, lastName, email, mobileNo, address, password, confirmPassword]);

    return (
        <Container component="main" maxWidth="xs">
            <Paper
                elevation={3}
                style={{
                    padding: '20px',
                    marginTop: '50px',
                    textAlign: 'center',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                }}
            >
                {user.id !== null ? (
                    <Link to="/products">
                        <Typography variant="h4" align="center" gutterBottom>
                            Register to Gaming Hub!
                        </Typography>
                    </Link>
                ) : (
                    <form onSubmit={(e) => registerUser(e)}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Register to Gaming Hub!
                        </Typography>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="firstName">First Name</InputLabel>
                            <Input
                                id="firstName"
                                type="text"
                                placeholder="Enter First Name"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="lastName">Last Name</InputLabel>
                            <Input
                                id="lastName"
                                type="text"
                                placeholder="Enter Last Name"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input
                                id="email"
                                type="text"
                                placeholder="Enter Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="mobileNo">Mobile No</InputLabel>
                            <Input
                                id="mobileNo"
                                type="tel"
                                placeholder="Enter 10 Digit No."
                                required
                                value={mobileNo}
                                onChange={(e) => setFormattedMobileNo(e.target.value)}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="address">Address</InputLabel>
                            <Input
                                id="address"
                                type="text"
                                placeholder="Enter Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </FormControl>
                        {isActive ? (
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                style={{ marginTop: '20px' }}
                            >
                                Submit
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                disabled
                                style={{ marginTop: '20px' }}
                            >
                                Submit
                            </Button>
                        )}
                        {error && (
                            <FormHelperText
                                error
                                style={{ textAlign: 'center', marginTop: '10px' }}
                            >
                                {error}
                            </FormHelperText>
                        )}
                    </form>
                )}
                <Typography variant="body1" align="center" style={{ marginTop: '10px' }}>
                    Have an account?{' '}
                    <MuiLink
                        component={RouterLink}
                        to="/login"
                        style={{ textDecoration: 'underline', cursor: 'pointer', color: 'inherit' }}
                    >
                        Sign In here
                    </MuiLink>
                </Typography>
            </Paper>
        </Container>
    );
};
