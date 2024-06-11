import {Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Stack, Typography} from "@mui/material";
import formatRelativeTime from "../utils/date.js";
import React, {useState} from "react";
import CommentIcon from "@mui/icons-material/Comment";
import Divider from "@mui/material/Divider";
import {ThumbUp, ThumbUpOffAlt} from "@mui/icons-material";


function CommentItem({comment}) {

    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    return (
        <Card sx={{ mt: 2, p: 0 }}>
            <CardHeader
                avatar={
                    <Avatar
                        aria-label="user-avatar"
                        src={comment.user.image_url}
                        sx={{ width: 30, height: 30 }}
                    />
                }
                title={
                    <Typography variant="body2" fontWeight="bold">
                        {comment.user.name}
                    </Typography>
                }
                subheader={
                    <Typography variant="caption" color="text.secondary">
                        {formatRelativeTime(comment.createdAt)}
                    </Typography>
                }
            />
            <CardContent sx={{ padding: 0, ml: 2}}>
                <Typography variant="body1" paragraph>
                    {comment.content}
                </Typography>
            </CardContent>
            <CardActions sx={{ padding: 0, mr: 2, mb:0.5 }}>
                <Stack direction="row" justifyContent="flex-end" sx={{ width: '100%' }}>
                    <Stack direction="row" spacing={1.2}>
                        <Stack direction="row" alignItems="center">
                            <IconButton>
                                {isLiked ? <ThumbUp sx={{ fontSize: '20px', color: 'red' }} /> : <ThumbUpOffAlt sx={{ fontSize: '20px' }} />}                            </IconButton>
                            <Typography variant="subtitle2" color="text.secondary">
                                {1}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </CardActions>
        </Card>
    );
}

export default CommentItem;
