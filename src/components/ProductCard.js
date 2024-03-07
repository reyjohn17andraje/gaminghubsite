import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';

export default function ProductCard({ productProp }) {
    const { _id, name, description, price, src } = productProp;

    const cardStyle = {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px',
        margin: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const imgStyle = {
        objectFit: 'contain',
        width: '100%',
        height: '200px',
    };

    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                <Card style={cardStyle}>
                    <CardMedia component="img" alt={name} image={src} style={imgStyle} />
                    <CardContent>
                        <Typography variant="h6" component="div">
                            {name}
                        </Typography>
                        <hr/>
                        <Typography variant="subtitle2" color="textSecondary">
                            Description:
                        </Typography>
                        <Typography variant="body2" paragraph>
                            {description}
                        </Typography>
                        <hr/>
                        <Typography variant="subtitle2" color="textSecondary">
                            Price:
                        </Typography>
                        <Typography variant="body1" paragraph>
                            &#8369;{price.toLocaleString()}.00
                        </Typography>
                    </CardContent>
                    <Button variant="contained" color="primary" component={Link} to={`/products/${_id}`}>
                        Details
                    </Button>
                </Card>
            </Grid>
        </>
    );
}

ProductCard.propTypes = {
    productProp: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
    }),
};
