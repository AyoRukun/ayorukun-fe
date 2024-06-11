import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    ButtonBase,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Stack,
    Typography
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { ROUTE_PATHS } from '../routes/index.js';
import formatRelativeTime from "../utils/date.js";
import {ThumbUp, ThumbUpOffAlt} from "@mui/icons-material";

function DiscussionItem({ discussion }) {
    const { id, title, content, user, totalComments, createdAt } = discussion;

    const [isLiked, setIsLiked] = useState(false);

    return (
        <Card sx={{ mt: 2 }}>
            <CardHeader
                avatar={<Avatar aria-label="user-avatar" src={user.image_url} />}
                title={
                    <ButtonBase
                        component={Link}
                        to={`${ROUTE_PATHS.DISCUSSION}/${id}`}
                        sx={{ width: '100%', justifyContent: 'left' }}
                    >
                        <Typography variant="h5">{title || 'Untitled Discussion' }</Typography>
                    </ButtonBase>
                }
                subheader={
                    <Typography variant="caption" color="text.secondary">
                        {`Oleh ${user.username} - ${formatRelativeTime(createdAt)}`}
                    </Typography>
                }
            />

            <ButtonBase
                component={Link}
                to={`${ROUTE_PATHS.DISCUSSION}/${id}`}
                sx={{ width: '100%', justifyContent: 'left' }}
            >
                <CardContent>
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
                        {content}
                    </Typography>
                </CardContent>
            </ButtonBase>

            <CardActions>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ width: '100%' }}>
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
                                {totalComments}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </CardActions>
        </Card>
    );
}

export default DiscussionItem;
