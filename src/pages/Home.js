import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import FeaturedProduct from '../components/FeaturedProduct';

export default function Home() {
    const data = {
        title: 'Gaming Hub',
        content: 'The place for all your gaming needs',
        destination: '/products',
        label: 'Shop now!',
    };

    return (
        <Container>
            <Banner data={data} />
            <br/><br/><br/><br/><br/>
            <Box mt={5} mb={5}>
                <Highlights />
            </Box>
            <br/><br/><br/><br/><br/>
            <Box mt={5} mb={5}>
                <FeaturedProduct />
            </Box>
        </Container>
    );
}
