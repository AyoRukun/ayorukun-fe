import React, { Fragment } from 'react';
import {
  InputLabel, Select, TextField,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import RegionSelect from './RegionSelect.jsx';
import ImageInput from './ImageInput.jsx';

function ReportForm({ formData, setFormData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegionChange = (selectedRegion) => {
    setFormData({ ...formData, region: selectedRegion });
  };

  const handleFileChange = (selectedFiles) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      report_files: [...prevFormData.report_files, ...selectedFiles],
    }));
  };

  return (
    <>
      <TextField
        label="Judul"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Dekskripsi Kejadian"
        name="content"
        value={formData.content}
        onChange={handleInputChange}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Nama Sekolah"
        name="school_name"
        value={formData.school_name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <RegionSelect onSelectRegion={handleRegionChange} />

      <TextField
        label="Tanggal Kejadian"
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

      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel id="report-as-label">Melaporkan sebagai</InputLabel>
        <Select
          labelId="report-as-label"
          name="report_as"
          value={formData.report_as}
          onChange={handleInputChange}
          label="Melaporkan sebagai"
        >
          <MenuItem value="Korban">Korban</MenuItem>
          <MenuItem value="Saksi">Saksi</MenuItem>
        </Select>
      </FormControl>

      <ImageInput files={formData.report_files} onFileChange={handleFileChange} />

    </>
  );
}

ReportForm.propTypes = {
  formData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    school_name: PropTypes.string.isRequired,
    case_date: PropTypes.string.isRequired,
    report_as: PropTypes.oneOf(['Korban', 'Saksi']).isRequired,
    region: PropTypes.string,
    report_files: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        path: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default ReportForm;
