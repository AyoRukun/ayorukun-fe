import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

function ImageDialog({ isOpen, onClose, selectedImage }) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Report Image</DialogTitle>
      <DialogContent>
        <img
          src={selectedImage}
          alt="Enlarged Report Image"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ImageDialog;
