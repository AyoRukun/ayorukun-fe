import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

function AppFooter(){
    return(
        <Box sx={{ bgcolor: '#FADEFF' , height: '30vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant='h4' component="h1" gutterBottom>ini footer</Typography>
        </Box>
    );
}

export default AppFooter;