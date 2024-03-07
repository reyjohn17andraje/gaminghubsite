import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard'; // Adjust the import path based on your file structure

export default function FeaturedProduct() {
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        fetch(`https://gaminghub-2.onrender.com/products/allactiveproducts`)
            .then((res) => res.json())
            .then((data) => {
                const numbers = [];
                const featured = [];

                const generateRandomNums = () => {
                    let randomNum = Math.floor(Math.random() * data.length);

                    if (numbers.indexOf(randomNum) === -1) {
                        numbers.push(randomNum);
                    } else {
                        generateRandomNums();
                    }
                };

                for (let i = 0; i < 3; i++) {
                    generateRandomNums();

                    featured.push({
                        data: data[numbers[i]],
                        key: data[numbers[i]]._id,
                    });
                }

                setPreviews(featured);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <h2 className="text-center">Featured Products</h2>
            <br />
            <Grid container spacing={5} justifyContent="center">
                {previews.map((preview) => (
                    <ProductCard key={preview.key} productProp={preview.data} />
                ))}
            </Grid>
        </>
    );
}
