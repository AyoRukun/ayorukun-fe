import React from 'react';
import { useSelector } from 'react-redux';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

function AboutPage() {
    const { user, isAuthenticated } = useSelector(state => state.auth);

    return (
        <Box sx={{ my: 4, textAlign: 'center'}}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 6 }}>
                <Grid item xs={6}>
                    <Box sx={{ backgroundImage: 'url(/img/dontbully.png)', backgroundSize: 'cover', height: '100vh'}}>

                    </Box>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'left', height: '100vh', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        {isAuthenticated ? `Tentang Kami ${user.name}` : 'Tentang Kami'}
                    </Typography>
                    <Typography variant="h6" component="h1" gutterBottom>
                        {isAuthenticated ? `Selamat Datang di AyoRukun!! ${user.name}` : 'Selamat Datang di AyoRukun!!'}
                    </Typography>
                    <Typography variant="subtitle1" component="h1" gutterBottom sx={{ textAlign: 'justify', paddingRight: 2}}>
                        {isAuthenticated ? `Kami tim yang berkomitmen mengatasi perbedaan sosial dan stigma dalam penanganan bullying di Indonesia. Fokus pada edukasi dan diskusi, AyoRukun bertujuan meningkatkan kesadaran, menghilangkan stigma, dan memberikan dukungan kepada korban. Bergabunglah dalam membangun komunitas yang kuat, menciptakan lingkungan yang aman. ${user.name}` : 
                        'Kami tim yang berkomitmen mengatasi perbedaan sosial dan stigma dalam penanganan bullying di Indonesia. Fokus pada edukasi dan diskusi, AyoRukun bertujuan meningkatkan kesadaran, menghilangkan stigma, dan memberikan dukungan kepada korban. Bergabunglah dalam membangun komunitas yang kuat, menciptakan lingkungan yang aman.'}
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ bgcolor: '#FADEFF' , height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 10 }}>
                <Typography variant='h3' component="h1" gutterBottom>Meet Our Team</Typography>
                <Stack direction="row" spacing={20}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                        <Avatar alt="Remy Sharp" src="/img/masanis.jpg" sx={{ width: 200, height: 200}} />
                        <Typography variant='h4' component="h1" gutterBottom>Anis Abdul Lathif</Typography>
                        <Typography variant='subtitle1' component="h1" gutterBottom>Backend Developer</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                        <Avatar alt="Remy Sharp" src="/img/foto wakecil.jpeg" sx={{ width: 200, height: 200}} />
                        <Typography variant='h4' component="h1" gutterBottom>Rizky Akbar Gusnaen</Typography>
                        <Typography variant='subtitle1' component="h1" gutterBottom>Frontend Developer</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                        <Avatar alt="Remy Sharp" src="/img/maswilliam.jpg" sx={{ width: 200, height: 200}} />
                        <Typography variant='h4' component="h1" gutterBottom>William Sanjaya</Typography>
                        <Typography variant='subtitle1' component="h1" gutterBottom>Frontend Developer</Typography>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}

export default AboutPage;