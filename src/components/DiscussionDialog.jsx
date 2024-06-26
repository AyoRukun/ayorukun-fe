import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import useStringInput from '../hooks/useInput.js';

function DiscussionDialog({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useStringInput();
  const [content, setContent] = useStringInput();

  const handleSubmit = () => {
    onSubmit({ title, content });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Tambah Diskusi Baru</DialogTitle>
      <DialogContent>
        <TextField
          label="Judul"
          fullWidth
          name="title"
          value={title}
          onChange={setTitle}
          margin="normal"
          autoFocus
        />
        <TextField
          label="Rincian.."
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
          disabled={!title.trim() || !content.trim()}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DiscussionDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DiscussionDialog;
