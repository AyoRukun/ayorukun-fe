import { Close, FileUploadOutlined } from '@mui/icons-material';
import {
  Autocomplete, ButtonBase, Chip, TextField,
} from '@mui/material';
import React, { Fragment, useRef, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';

function ImageInput({ files, onFileChange }) {
  const fileRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState(files);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setSelectedFiles(newFiles);
    onFileChange(newFiles);
  };

  const handleFileDelete = (fileToDelete) => () => {
    setSelectedFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
    onFileChange(selectedFiles.filter((file) => file !== fileToDelete));
  };

  return (
    <FormControl fullWidth margin="normal">
      <Autocomplete
        multiple
        value={selectedFiles}
        options={[]}
        getOptionLabel={(option) => option.name || option}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Bukti Pendukung"
            disabled
            onClick={() => fileRef.current.click()}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {selectedFiles.length > 0 && (
                    <ButtonBase onClick={() => setSelectedFiles([])}>
                      <Close />
                    </ButtonBase>
                  )}
                  <ButtonBase>
                    <FileUploadOutlined />
                  </ButtonBase>
                </>
              ),
            }}
            sx={{
              color: 'inherit',
              '& .MuiInputBase-root , & .MuiInputBase-input': {
                paddingRight: '1rem !important',
                cursor: 'pointer',
              },
            }}
          />
        )}
        renderTags={(value, getTagProps) => value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option.name || option}
            {...getTagProps({ index })}
            onDelete={handleFileDelete(option)}
          />
        ))}
      />
      <input
        type="file"
        ref={fileRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple
      />
    </FormControl>
  );
}

ImageInput.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onFileChange: PropTypes.func.isRequired,
};

export default ImageInput;
