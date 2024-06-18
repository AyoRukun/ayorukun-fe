import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function ImageDialog({ isOpen, onClose, selectedImage }) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Report Image</DialogTitle>
      <DialogContent>
        <img
          src={selectedImage}
          alt="Report Files"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </DialogContent>
    </Dialog>
  );
}

ImageDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedImage: PropTypes.string.isRequired,
};

export default ImageDialog;
