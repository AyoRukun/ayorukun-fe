import React from 'react';
import { useSelector } from 'react-redux';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function ReportPage() {
    const { user, isAuthenticated } = useSelector(state => state.auth);

    return (
        <Box sx={{ my: 4, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {isAuthenticated ? `Apakah Anda Ingin Melakukan Pengaduan?, ${user.name}` : 'Apakah Anda Ingin Melakukan Pengaduan?'}
            </Typography>
        </Box>
    );
}

export default ReportPage;