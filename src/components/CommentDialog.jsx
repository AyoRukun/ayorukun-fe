import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import useStringInput from '../hooks/useInput.js';

function CommentDialog({ isOpen, onClose, onSubmit }) {
  const [content, setContent] = useStringInput();

  const handleSubmit = () => {
    onSubmit({ content });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Tambahkan Komentar</DialogTitle>
      <DialogContent>
        <TextField
          label="Komentar"
          fullWidth
          name="content"
          value={content}
          onChange={setContent}
          multiline
          rows={4}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!content.trim()}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CommentDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CommentDialog;
