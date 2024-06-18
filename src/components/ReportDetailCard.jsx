import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import formatRelativeTime from '../utils/date.js';
import { BASE_URL } from '../utils/api.js';
import ImageDialog from './ImageDialog.jsx';
import PropTypes from 'prop-types';

function ReportDetailCard({ report }) {
  const {
    user, title, createdAt, content, region, school_name, report_files, report_as, comments,
  } = report;

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Card sx={{ mb: 4, borderRadius: 8 }}>
      <CardHeader
        avatar={<Avatar src={user.image_url} aria-label="user-avatar" />}
        title={<Typography variant="h4">{title || 'Untitled Discussion'}</Typography>}
        subheader={(
          <Typography
            variant="caption"
          >
            {`Oleh ${user.name} - ${formatRelativeTime(createdAt)}`}
          </Typography>
)}
      />
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <Chip label={region} size="small" />
          <Chip label={school_name} size="small" />
        </Stack>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {content}
        </Typography>
        {report_files.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex',
            gap: 1,
            mt: 2,
          }}
        >
          {report_files.map((file) => (
            <Box
              key={file.id}
              onClick={() => handleImageClick(`${BASE_URL}/${file.path}`)}
              sx={{
                maxWidth: '100px',
                maxHeight: '100px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <img
                src={`${BASE_URL}/${file.path}`}
                alt={`Report Files ${file.id}`}
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </Box>
          ))}
        </Box>
        )}
        <ImageDialog isOpen={openDialog} onClose={handleCloseDialog} selectedImage={selectedImage} />

      </CardContent>
      <CardActions>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '100%' }}
        >
          <Stack direction="row" spacing={1.2}>
            <Stack direction="row" alignItems="center">
              <Chip label={report_as} color="primary" size="small" sx={{ ml: 1 }} />
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1.2}>
            <Stack direction="row" alignItems="center">
              <IconButton>
                <CommentIcon sx={{ fontSize: '20px' }} />
              </IconButton>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mr: 2 }}>
                {comments.length}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
}

ReportDetailCard.propTypes = {
  report: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    school_name: PropTypes.string.isRequired,
    report_files: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        path: PropTypes.string.isRequired,
      }),
    ).isRequired,
    report_as: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        user: PropTypes.shape({
          name: PropTypes.string.isRequired,
          image_url: PropTypes.string.isRequired,
        }).isRequired,
        likedBy: PropTypes.arrayOf(PropTypes.number).isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default ReportDetailCard;
