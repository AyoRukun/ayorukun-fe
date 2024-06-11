import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReportDetail, addReportComment } from '../states/report/reportSlice'; // Sesuaikan path
import {
    Avatar,
    ButtonBase,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    Stack,
    Typography,
    Divider,
    IconButton,
    Button,
    FormLabel,
    TextField,
    FormControl,
    Box,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    ImageList,
    ImageListItem
} from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CommentIcon from '@mui/icons-material/Comment';
import { LoadingButton } from '@mui/lab';
import { ROUTE_PATHS } from '../routes/index.js';
import {addDiscussionComment, fetchDiscussionDetail} from "../states/discussion/discusssionSlice.js";
import AddIcon from "@mui/icons-material/Add.js";
import {BASE_URL} from "../utils/api.js";
import postedAt, {formatRelativeTime, formatReportDate} from "../utils/date.js";
import {ThumbUp, ThumbUpOffAlt} from "@mui/icons-material";
import CommentList from "../components/CommentList.jsx";

function ReportDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { report, comments, isLoading, error } = useSelector((state) => state.report)


    const [commentInput, setCommentInput] = useState('');
    const [commentError, setCommentError] = useState('');

    const user = useSelector((state) => state.auth.user);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        dispatch(fetchReportDetail(id));
    }, [dispatch, id]);

    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    const handleCommentSubmit = (newComment) => {
        dispatch(dispatch(addReportComment({ reportId: id, commentData: newComment })));
        dispatch(fetchReportDetail(id));
    };


    if (isLoading || !report) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <Grid container justifyContent="center" minHeight="100vh">
            <Grid item sm={12} md={7} sx={{ px: { xs: 2, md: 0 } }}>
                <Box sx={{ my: { xs: 1, md: 3 } }}>
                    <Button
                        onClick={() => {
                            navigate(ROUTE_PATHS.REPORT, { replace: true }); // Navigate ke list report
                        }}
                        variant="text"
                    >
                        <ArrowBackIcon />
                    </Button>

                    <Card sx={{ mt: 2 }}>
                        <CardHeader
                            avatar={<Avatar aria-label="user-avatar" src={report.user.image_url} />}

                            title={
                                <Typography variant="h5">{report.title}</Typography>
                            }
                            subheader={
                                <Typography variant="caption" color="text.secondary">
                                    {`Oleh ${report.user.name} - ${report.createdAt}`}
                                </Typography>
                            }
                        />

                        <CardContent>

                            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                                <Chip label={report.region} size="small" />
                                <Chip label={report.school_name} size="small" />
                            </Stack>

                            <Typography variant="body1">
                                {report.content}
                            </Typography>

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
                                            {report.comments?.length}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </CardActions>

                    </Card>

                    <CommentList comments={report.comments } handleNewCommentSubmit={handleCommentSubmit}/>


                    {/*<Card sx={{ mt: 2 }}>*/}
                    {/*    <CardHeader*/}
                    {/*        sx={{ pb: 0 }}*/}
                    {/*        title={*/}
                    {/*            <Stack direction="row" alignItems="center" justifyContent="space-between"> /!* Stack untuk mengatur tata letak *!/*/}
                    {/*                <Typography variant="h6" sx={{ ml: 1, mb: 0.5 }}>*/}
                    {/*                    {`Komentar${report.comments?.length > 1 ? 's' : ''} (${report.comments?.length || 0})`}*/}
                    {/*                </Typography>*/}
                    {/*                <Button*/}
                    {/*                    variant="contained"*/}
                    {/*                    onClick={handleCommentSubmit}*/}
                    {/*                >*/}
                    {/*                    <AddIcon />*/}
                    {/*                </Button>*/}
                    {/*            </Stack>*/}

                    {/*        }*/}
                    {/*    />*/}

                    {/*    <Divider variant="middle" sx={{ mt: 2 }} />*/}


                    {/*    <CardContent>*/}
                    {/*        <Stack direction="column" spacing={2}>*/}
                    {/*            {report.comments?.map((comment) => (*/}
                    {/*                <React.Fragment key={comment.id}>*/}
                    {/*                    <Stack direction="row" alignItems="center" spacing={1}>*/}
                    {/*                        <Avatar src={comment.user.image_url} alt={comment.user.name} sx={{ width: 24, height: 24 }} />*/}
                    {/*                        <Typography variant="subtitle2">{comment.user.name}</Typography>*/}
                    {/*                        <Typography variant="caption" color="text.secondary">*/}
                    {/*                            &bull; {comment.createdAt}*/}
                    {/*                        </Typography>*/}
                    {/*                    </Stack>*/}
                    {/*                    <Typography variant="body1">{comment.content}</Typography>*/}

                    {/*                    <Divider variant="middle" sx={{ mt: 2 }} />*/}
                    {/*                </React.Fragment>*/}
                    {/*            ))}*/}
                    {/*        </Stack>*/}
                    {/*    </CardContent>*/}
                    {/*</Card>*/}
                </Box>
            </Grid>
        </Grid>
    );
}

export default ReportDetail;
