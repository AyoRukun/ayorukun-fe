import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../routes/index.jsx';

function HomePage() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', boxSizing: 'border-box', textAlign: 'center', backgroundImage: 'url(/img/background4.png)', backgroundSize: 'cover', height: '100vh', mr: 0,
      }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        >
          <Typography variant="h1" component="h1" gutterBottom>
            {isAuthenticated ? `AyoRukun, ${user.name}` : 'AyoRukun'}
          </Typography>
          <Typography variant="subtitle1" component="h1" gutterBottom>
            {isAuthenticated ? `Sikapilah toleransi terhadap perbedaan pendapat dan kepercayaan., ${user.name}` : 'Sikapilah toleransi terhadap perbedaan pendapat dan kepercayaan.'}
          </Typography>
          <Box>
            <Button
              sx={{
                padding: '20px',
                color: 'primary',
              }}
              variant="text"
              color="info"
              size="small"
              onClick={() => {
                navigate(ROUTE_PATHS.DISCUSSION, { replace: true });
              }}
            >
              Forum Diskusi
            </Button>
            <Button
              sx={{
                padding: '20px',
              }}
              variant="text"
              color="info"
              size="small"
              onClick={() => {
                navigate(ROUTE_PATHS.REPORT, { replace: true });
              }}
            >
              Pelaporan
            </Button>
          </Box>
        </Box>
        <Box />
      </Box>
      <Box sx={{ backgroundColor: 'white', mt: 10 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <Box>
            <img src="/img/bullying.jpg" alt="" height={700} />
          </Box>
          <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
          }}
          >
            <Typography variant="h1" component="h1">Apa itu Bullying?</Typography>
            <Typography variant="subtitle1" component="h1">
              Perundungan/Bullying adalah perilaku
              tidak menyenangkan baik secara verbal,
              fisik, ataupun sosial di dunia nyata maupun
              dunia maya yang membuat seseorang
              merasa tidak nyaman, sakit hati dan tertekan
              baik dilakukan oleh perorangan ataupun
              kelompok.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" sx={{ mb: 5 }}>Macam-macam Bullying</Typography>
          <Box sx={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', placeItems: 'center', mb: 5,
          }}
          >
            <img src="/img/physicalbullying.png" alt="" height={300} />
            <img src="/img/verbalbullying.png" alt="" height={300} />
            <img src="/img/socialbullying.png" alt="" height={300} />
            <img src="/img/cyberbullying.png" alt="" height={300} />
          </Box>
        </Box>
        <Box sx={{
          textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
        }}
        >
          <Typography variant="h3" component="h1" sx={{ mb: 5 }}>Upaya pencegahan Bullying</Typography>
          <Box sx={{ display: 'flex' }}>
            <Card sx={{ maxWidth: 288 }}>
              <CardMedia
                sx={{ height: 200 }}
                image="/img/upayaanak.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Upaya Pencegahan oleh Anak
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mengembangakan budaya relasi/ pertemanan yang positif
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 288 }}>
              <CardMedia
                sx={{ height: 200 }}
                image="/img/upayakeluarga.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Upaya Pencegahan oleh Keluarga
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Membangun komunikasi antara anak dengan orang tua
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 288 }}>
              <CardMedia
                sx={{ height: 200 }}
                image="/img/upayasatpendik.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Upaya Pencegahan oleh Satuan Pendidikan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pendidik dan tenaga kependidikan memberi keteladanan
                  dengan berperilaku positif dan tanpa kekerasan
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 288 }}>
              <CardMedia
                sx={{ height: 200 }}
                image="/img/upayamasyarakat.png"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Upaya Pencegahan oleh Masyarakat
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mengembangkan perilaku peduli dengan prinsip
                  kepentingan terbaik bagi anak dan semua anak
                  adalah anak kita yang harus dilindungi
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 288 }}>
              <CardMedia
                sx={{ height: 200 }}
                image="/img/upayapemerintah.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Upaya Pencegahan oleh Pusat
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Melakukan koordinasi antar K/L yang memiliki
                  kebijakan atau program berbasis sekolah
                  untuk bersama-sama melakukan pencegahan
                  terhadap perundungan/bullying.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
