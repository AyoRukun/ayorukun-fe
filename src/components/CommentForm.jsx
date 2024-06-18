import React from 'react';
import {
  Box, Button, TextField, Alert,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTE_PATHS } from '../routes/index.jsx';
import useStringInput from '../hooks/useInput.js';
import PropTypes from 'prop-types';

function CommentForm({ onAddComment, id }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [content, setContent] = useStringInput();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (content.trim() !== '' && onAddComment) {
      onAddComment(id, { content });
      setContent('');
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mb: 4 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={setContent}
            variant="outlined"
            placeholder="Tambahkan komentar Anda..."
            sx={{
              mb: 2,
              borderRadius: '16px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            startIcon={<SendIcon />}
            sx={{ borderRadius: '16px' }}
            disabled={!content.trim()}
          >
            Kirim
          </Button>
        </Box>
      ) : (
        <Alert severity="warning" sx={{ mb: 4 }}>
          Silakan
          {' '}
          <Link to={ROUTE_PATHS.SIGN_IN}>login</Link>
          {' '}
          atau
          {' '}
          <Link to={ROUTE_PATHS.SIGN_UP}>daftar</Link>
          {' '}
          untuk menambahkan komentar.
        </Alert>
      )}
    </>
  );
}

CommentForm.propTypes = {
  onAddComment: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default CommentForm;
