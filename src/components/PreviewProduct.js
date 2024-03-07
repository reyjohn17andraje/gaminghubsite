import React from 'react';
import { Grid, Paper, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function PreviewProduct(props) {
    const { data } = props;

    const { _id, name, description, price, src } = data;

    return (
        <Grid item xs={12} sm={12} md={12}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    height="auto"
                    image={src}
                    alt={name}
                    style={{ objectFit: 'contain', width: '100%' }}
                />

                <CardContent style={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography variant="h5" component="div">
                        <Link to={`/products/${_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {name}
                        </Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>

                <CardContent style={{ textAlign: 'center' }}>
                    <Typography variant="h6" component="div">
                        ₱{price.toLocaleString()}.00
                    </Typography>
                    <Button variant="contained" color="primary" fullWidth component={Link} to={`/products/${_id}`}>
                        Details
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    );
}
