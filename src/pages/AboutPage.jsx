import React from 'react';
import { useSelector } from 'react-redux';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function AboutPage() {
    const { user, isAuthenticated } = useSelector(state => state.auth);

    return (
        <Box sx={{ my: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {isAuthenticated ? `ini halaman tentang ${user.name}` : 'ini halaman tentang'}
            </Typography>
        </Box>
    );
}

export default AboutPage;