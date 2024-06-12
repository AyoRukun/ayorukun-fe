import {Button, Card, CardContent, CardHeader, Stack, Typography} from "@mui/material";
import {sortByCreatedAt} from "../utils/date.js";
import React, {useState} from "react";
import CommentItem from "./CommentItem.jsx";
import CommentDialog from "./CommentDialog.jsx";
import AddIcon from "@mui/icons-material/Add";


function CommentList({comments, handleNewCommentSubmit, source}) {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Card sx={{mt: 2}}>
            <CommentDialog
                isOpen={openDialog}
                onClose={handleCloseDialog}
                onSubmit={handleNewCommentSubmit}
            />
            <CardHeader
                sx={{pb: 0}}
                title={
                    <Typography variant="h6" sx={{mb: 0.5}}>
                        {`Komentar (${comments?.length || 0})`}
                    </Typography>

                }
                action={
                    <Button
                        variant="contained"
                        onClick={handleOpenDialog}
                    >
                        <AddIcon/>
                    </Button>
                }
            />

            <CardContent>
                <Stack direction="column" spacing={2}>
                    {sortByCreatedAt(comments).map((comment) => (
                        <CommentItem key={comment.id} comment={comment} source={source}/>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}

export default CommentList;
