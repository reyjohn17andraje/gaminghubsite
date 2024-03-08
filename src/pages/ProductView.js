import React, { useState, useEffect, useContext } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Breadcrumbs,
  Link as MuiLink,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function ProductView() {
    const { productId } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(price.toFixed(2));
    const [image, setImage] = useState("");

    const addToCart = (productId) => {
        fetch(`https://gaminghub-2.onrender.com/carts/addtocart`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                productId: productId,
                name: name,
                description: description,
                price: totalPrice,
                quantity: quantity
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'Product added to cart successfully') {
                Swal.fire({
                    title: 'Successfully Added to Cart',
                    icon: 'success',
                    text: 'You have successfully added this item to cart.'
                });
                navigate("/products");
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    text: "Please try again"
                });
            }
        })
    }

    useEffect(() => {
        fetch(`https://gaminghub-2.onrender.com/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                setName(data.product.name);
                setDescription(data.product.description);
                setPrice(data.product.price);
                setTotalPrice((data.product.price * quantity).toFixed(2));
                setImage(data.product.src);
            })
    }, [productId, quantity]);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <Container className="mt-5">
            <Grid container justifyContent="center">
                <Grid item xs={12}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <MuiLink component={RouterLink} to="/" color="inherit">
                            Home
                        </MuiLink>
                        <MuiLink component={RouterLink} to="/products" color="inherit">
                            Products
                        </MuiLink>
                        <Typography color="textPrimary">{name}</Typography>
                    </Breadcrumbs>
                </Grid>
                <br /><br />
                <Grid item xs={12} sm={8} md={6} lg={6}>
                  <Card>
                    <CardMedia
                      component="img"
                      src={image}
                      alt={name}
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <CardContent className="text-center">
                      <Typography variant="h5">{name}</Typography>
                      <br />
                      <Typography variant="subtitle1">Description:</Typography>
                      <Typography variant="body1">{description}</Typography>
                      <br />
                      <Typography variant="subtitle1">Price:</Typography>
                      <Typography variant="body1">&#8369;{Number(totalPrice).toLocaleString()}.00</Typography>
                      <br />
                      <Grid container alignItems="center" justifyContent="center">
                        <Grid item>
                          <IconButton onClick={handleIncrement} aria-label="Increase Quantity">
                            <AddIcon />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <TextField
                            id="quantity"
                            label="Quantity"
                            type="number"
                            value={quantity}
                            InputProps={{
                              inputProps: { min: 1 },
                            }}
                            fullWidth
                            readOnly
                          />
                        </Grid>
                        <Grid item>
                          <IconButton onClick={handleDecrement} aria-label="Decrease Quantity">
                            <RemoveIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <br /><br />
                      {user.id !== null ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => addToCart(productId)}
                          fullWidth
                        >
                          Add to Cart
                        </Button>
                      ) : (
                        <MuiLink>
                          <Button
                            component={RouterLink}
                            to="/login"
                            variant="contained"
                            color="error"
                            fullWidth
                          >
                            Login to Continue Shopping
                          </Button>
                        </MuiLink>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
