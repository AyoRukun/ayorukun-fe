import {
    Avatar, ButtonBase,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    Dialog, DialogContent,
    DialogTitle, IconButton,
    ImageList,
    ImageListItem,
    Stack,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import {ROUTE_PATHS} from "../routes/index.js";
import {BASE_URL} from "../utils/api.js";
import React, {useState} from "react";
import formatRelativeTime from "../utils/date.js";
import CommentIcon from "@mui/icons-material/Comment";
import {ThumbUp, ThumbUpOffAlt} from "@mui/icons-material";
import Box from "@mui/material/Box";


function ReportItem({report}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    return (
        <Card key={report.id} sx={{ mt: 2 }}>
            <CardHeader
                avatar={<Avatar aria-label="user-avatar" src={report.user.image_url} />}
                title={
                    <ButtonBase
                        component={Link}
                        to={`${ROUTE_PATHS.REPORT}/${report.id}`}
                        sx={{ width: '100%', justifyContent: 'left' }}
                    >
                        <Typography variant="h5">{report.title || 'Untitled Discussion' }</Typography>
                    </ButtonBase>
                }
                subheader={
                    <Typography variant="caption" color="text.secondary">
                        {`Oleh ${report.user.username} - ${formatRelativeTime(report.createdAt)}`}
                    </Typography>
                }
            />

            <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <Chip label={report.region} size="small" />
                    <Chip label={report.school_name} size="small" />
                </Stack>

                <ButtonBase
                    component={Link}
                    to={`${ROUTE_PATHS.REPORT}/${report.id}`}
                    sx={{ width: '100%', justifyContent: 'left' }}
                >
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
                </ButtonBase>

                {report.report_files?.length > 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "flex",
                            gap: 1,
                            mt: 2,
                        }}
                    >
                        {report.report_files.map((file) => (
                            <Box
                                key={file.id}
                                onClick={() => handleImageClick(`${BASE_URL}/${file.path}`)}
                                sx={{
                                    maxWidth: "100px",
                                    maxHeight: "100px", // Limit
                                    overflow: "hidden",
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={`${BASE_URL}/${file.path}`}
                                    alt={`Report Image ${file.id}`}
                                    loading="lazy"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                )}

                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Report Image</DialogTitle>
                    <DialogContent>
                        <img
                            src={selectedImage}
                            alt="Enlarged Report Image"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    </DialogContent>
                </Dialog>
            </CardContent>

            <CardActions>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                    <Stack direction="row" spacing={1.2}>
                        <Stack direction="row" alignItems="center">
                            <Chip label={report.report_as} color="primary" size="small" sx={{ml: 1}}/>
                        </Stack>
                    </Stack>

                    <Stack direction="row" spacing={1.2}>
                        <Stack direction="row" alignItems="center">
                            <IconButton>
                                {isLiked ? <ThumbUp sx={{ fontSize: '20px', color: 'red' }} /> : <ThumbUpOffAlt sx={{ fontSize: '20px' }} />}
                            </IconButton>
                            <Typography variant="subtitle2" color="text.secondary">
                                {0}
                            </Typography>
                            <IconButton>
                                <CommentIcon sx={{ fontSize: '20px' }} />
                            </IconButton >
                            <Typography variant="subtitle2" color="text.secondary" sx={{mr: 2}}>
                                {report.totalComments}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </CardActions>
        </Card>
    );
}

export default ReportItem;
