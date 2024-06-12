import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Select,
  TextField,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import RegionSelect from './RegionSelect.jsx';

function DeleteIcon() {
  return null;
}

export default function ReportDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    school_name: '',
    case_date: new Date().toISOString().split('T')[0],
    report_as: '',
    region: '',
    report_files: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegionChange = (selectedRegion) => {
    setFormData({ ...formData, region: selectedRegion });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      report_files: [...formData.report_files, ...e.target.files],
    });
  };

  const handleRemoveFile = (index) => {
    setFormData({
      ...formData,
      report_files: formData.report_files.filter((_, i) => i !== index),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Report</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <TextField
          label="School Name"
          name="school_name"
          value={formData.school_name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Case Date"
          name="case_date"
          type="date"
          value={formData.case_date}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="report-as-label">Report As</InputLabel>
          <Select
            labelId="report-as-label"
            id="report-as-select"
            name="report_as"
            value={formData.report_as}
            onChange={handleInputChange}
          >
            <MenuItem value="Korban">Korban</MenuItem>
            <MenuItem value="Saksi">Saksi</MenuItem>
          </Select>
        </FormControl>

        <RegionSelect onSelectRegion={handleRegionChange} />

        <input
          accept="image/*"
          id="report-files-input"
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="report-files-input">
          <Button variant="contained" component="span">
            Tambahkan Berkas
          </Button>
        </label>

        <List>
          {formData.report_files.map((file, index) => (
            <ListItem key={index}>
              <ListItemText primary={file.name} />
              <IconButton edge="end" onClick={() => handleRemoveFile(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
