import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

function AboutPage() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Box sx={{
      textAlign: 'center', display: 'flex', flexDirection: 'column', mt: 10,
    }}
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{
          backgroundImage: 'url(/img/dontbully.png)',
          backgroundSize: 'cover',
          width: { xs: '100%', md: '50%' },
          minHeight: { xs: '30vh', md: '100vh' },
        }}
        />

        <Box sx={{
          textAlign: 'left',
          width: { xs: '100%', md: '50%' },
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            {isAuthenticated ? `Tentang Kami ${user.name}` : 'Tentang Kami'}
          </Typography>
          <Typography variant="h6" component="h1" gutterBottom>
            {isAuthenticated ? `Selamat Datang di AyoRukun!! ${user.name}` : 'Selamat Datang di AyoRukun!!'}
          </Typography>
          <Typography variant="subtitle1" component="h1" gutterBottom sx={{ textAlign: 'justify', paddingRight: 2 }}>
            {isAuthenticated ? `Kami tim yang berkomitmen mengatasi perbedaan sosial dan stigma dalam penanganan bullying di Indonesia. Fokus pada edukasi dan diskusi, AyoRukun bertujuan meningkatkan kesadaran, menghilangkan stigma, dan memberikan dukungan kepada korban. Bergabunglah dalam membangun komunitas yang kuat, menciptakan lingkungan yang aman. ${user.name}`
              : 'Kami tim yang berkomitmen mengatasi perbedaan sosial dan stigma dalam penanganan bullying di Indonesia. Fokus pada edukasi dan diskusi, AyoRukun bertujuan meningkatkan kesadaran, menghilangkan stigma, dan memberikan dukungan kepada korban. Bergabunglah dalam membangun komunitas yang kuat, menciptakan lingkungan yang aman.'}
          </Typography>
        </Box>
      </Box>

      <Box sx={{
        bgcolor: '#FADEFF',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
        mt: 4,
      }}
      >
        <Typography variant="h3" component="h1" gutterBottom>Meet Our Team</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
          }}
          >
            <Avatar alt="Anis Abdul Lathif" src="/img/masanis.jpg" sx={{ width: 200, height: 200 }} />
            <Typography variant="h4" component="h1" gutterBottom>Anis Abdul Lathif</Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>Backend Developer</Typography>
          </Box>

          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
          }}
          >
            <Avatar alt="Rizky Akbar Gusnaen" src="/img/rizky.png" sx={{ width: 200, height: 200 }} />
            <Typography variant="h4" component="h1" gutterBottom>Rizky Akbar Gusnaen</Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>Frontend Developer</Typography>
          </Box>

          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
          }}
          >
            <Avatar alt="William Sanjaya" src="/img/maswilliam.jpg" sx={{ width: 200, height: 200 }} />
            <Typography variant="h4" component="h1" gutterBottom>William Sanjaya</Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>Frontend Developer</Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default AboutPage;
