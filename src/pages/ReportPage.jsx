import React from 'react';
import { useSelector } from 'react-redux';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {ROUTE_PATHS} from "../routes/index.js";
import {useNavigate} from "react-router-dom";

function ReportPage() {
    const { user, isAuthenticated } = useSelector(state => state.auth);
    const navigate = useNavigate();

    return (
        <Box sx={{ my: 4, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {isAuthenticated ? `Apakah Anda Ingin Melakukan Pengaduan?, ${user.name}` : 'Apakah Anda Ingin Melakukan Pengaduan?'}
            </Typography>
            <Button sx={{
                padding: '20px',
                bgcolor: '#FADEFF'
                }}
                    variant="text"
                    color="info"
                    size="small"
                    onClick={() => {
                        navigate(ROUTE_PATHS.DISCUSSION, { replace: true });
                    }}
                >
                Lapor
            </Button>
        </Box>
    );
}

export default ReportPage;