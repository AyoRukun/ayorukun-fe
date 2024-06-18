import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';

function Loading() {
  const isLoading = useSelector((state) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
    </Box>

  );
}

export default Loading;
