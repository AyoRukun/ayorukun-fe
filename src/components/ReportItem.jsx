import {
  Avatar,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import { ThumbUp, ThumbUpOffAlt } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import formatRelativeTime from '../utils/date.js';
import { BASE_URL } from '../utils/api.js';
import { ROUTE_PATHS } from '../routes/index.jsx';
import { likeReportById, unlikeReportById } from '../states/report/reportSlice.js';
import ImageDialog from './ImageDialog.jsx';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

function ReportItem({ report }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => (state.auth.user ? state.auth.user.id : null));
  const isLiked = report.likedBy.includes(userId);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleLikeClick = () => {
    if (!userId) {
      toast.warn('Silakan login untuk menyukai laporan ini.');
      return;
    }

    if (isLiked) {
      dispatch(unlikeReportById(report.id));
    } else {
      dispatch(likeReportById(report.id));
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    handleOpenDialog();
  };

  return (
    <Card sx={{ mb: 4, borderRadius: 8 }}>
      <ButtonBase
        component={Link}
        to={`${ROUTE_PATHS.REPORT}/${report.id}`}
        sx={{ width: '100%', justifyContent: 'left' }}
      >
        <CardHeader
          avatar={<Avatar aria-label="user-avatar" src={report.user.image_url} />}
          title={<Typography variant="h5">{report.title || 'Untitled Discussion'}</Typography>}
          subheader={(
            <Typography variant="caption" color="text.secondary">
              {`Oleh ${report.user.username} - ${formatRelativeTime(report.createdAt)}`}
            </Typography>
                      )}
        />
      </ButtonBase>

      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <Chip label={report.region} size="small" />
          <Chip label={report.school_name} size="small" />
        </Stack>
        <Typography
          variant="body2"
          sx={{
            WebkitLineClamp: 4,
            lineClamp: 4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {report.content}
        </Typography>

        {report.report_files.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex',
              gap: 1,
              mt: 2,
            }}
          >
            {report.report_files.map((file) => (
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
                  alt={`Report File ${file.id}`}
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

        <ImageDialog
          isOpen={openDialog}
          onClose={handleCloseDialog}
          selectedImage={selectedImage}
        />

      </CardContent>

      <CardActions>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
          <Stack direction="row" spacing={1.2}>
            <Stack direction="row" alignItems="center">
              <Chip label={report.report_as} color="primary" size="small" sx={{ ml: 1 }} />
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1.2}>
            <Stack direction="row" alignItems="center">
              <IconButton onClick={handleLikeClick}>
                {isLiked ? (
                  <ThumbUp sx={{ fontSize: '20px' }} />
                ) : (
                  <ThumbUpOffAlt sx={{ fontSize: '20px' }} />
                )}
              </IconButton>
              <Typography variant="subtitle2" color="text.secondary">
                {report.likedBy.length || 0}
              </Typography>
              <IconButton>
                <CommentIcon sx={{ fontSize: '20px' }} />
              </IconButton>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mr: 2 }}>
                {report.totalComments}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
}

ReportItem.propTypes = {
  report: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    school_name: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
    }).isRequired,
    report_as: PropTypes.string.isRequired,
    report_files: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        path: PropTypes.string.isRequired,
      }),
    ).isRequired,
    totalComments: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    likedBy: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default ReportItem;
