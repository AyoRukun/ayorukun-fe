import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import PropTypes from 'prop-types';
import ReportForm from './ReportForm.jsx';

export default function ReportDialog({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    school_name: '',
    case_date: new Date().toISOString().split('T')[0],
    report_as: '',
    region: '',
    report_files: [],
  });

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Report</DialogTitle>
      <DialogContent>
        <ReportForm formData={formData} setFormData={setFormData} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={!formData.title.trim() || !formData.content.trim() || !formData.school_name.trim() || !formData.report_as.trim() || !formData.region.trim()}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ReportDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
