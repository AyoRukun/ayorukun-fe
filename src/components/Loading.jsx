import { CircularProgress, Box } from '@mui/material';
import { useSelector } from 'react-redux';

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
