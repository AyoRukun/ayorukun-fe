import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import {useNavigate} from "react-router-dom";
import {ROUTE_PATHS} from "../routes/index.js";

function AppFooter(){

    const navigate = useNavigate();
    return(
        <Box sx={{ bgcolor: '#FADEFF' , height: '30vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Stack direction="row" gap={20}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Box>
                        <img src="/ayorukun.svg" alt="" height={100}/>
                    </Box>
                    <Box>
                        <Typography variant='h5' component="h1" gutterBottom>AyoRukun</Typography>
                        <Typography variant='subtitle1' component="h1" gutterBottom>
                            Sikapilah toleransi terhadap perbedaan pendapat dan kepercayaan.
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <Typography variant='h5' component="h1" gutterBottom>Fitur</Typography>
                        <Link
                            color="inherit"
                            underline='none'
                            component="button"
                            variant="body2"
                            onClick={() => {
                                navigate(ROUTE_PATHS.HOME, { replace: true });
                            }}
                            >
                            Beranda
                        </Link>
                        <Link
                            color="inherit"
                            underline='none'
                            component="button"
                            variant="body2"
                            onClick={() => {
                                navigate(ROUTE_PATHS.DISCUSSION, { replace: true });
                            }}
                            >
                            Diskusi
                        </Link>
                        <Link
                            color="inherit"
                            underline='none'
                            component="button"
                            variant="body2"
                            onClick={() => {
                                navigate(ROUTE_PATHS.REPORT, { replace: true });
                            }}
                            >
                            Pelaporan
                        </Link>
                        <Link
                            color="inherit"
                            underline='none'
                            component="button"
                            variant="body2"
                            onClick={() => {
                                navigate(ROUTE_PATHS.ABOUT, { replace: true });
                            }}
                            >
                            Tentang
                        </Link>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <Typography variant='h5' component="h1" gutterBottom>Tentang</Typography>
                    <Typography variant='subtitle1' component="h1" gutterBottom>
                        Hubungi kami jika terdapat kendala saat menggunakan website satu hati.
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
}

export default AppFooter;