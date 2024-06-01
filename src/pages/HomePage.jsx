import React from 'react';
import { useSelector } from 'react-redux';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function HomePage() {
    const { user, isAuthenticated } = useSelector(state => state.auth);

    return (
        <Box sx={{ my: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {isAuthenticated ? `Halo, ${user.name}` : 'Halo'}
            </Typography>
        </Box>
    );
}

export default HomePage;
