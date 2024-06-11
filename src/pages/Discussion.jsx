import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { addDiscussion, fetchDiscussions } from '../states/discussion/discusssionSlice.js';
import DiscussionList from "../components/DiscussionList.jsx";

function Discussion() {
    const dispatch = useDispatch();
    const { discussions } = useSelector((state) => state.discussion);

    useEffect(() => {
        dispatch(fetchDiscussions());
    }, [dispatch]);

    const handleNewDiscussion = (newDiscussion) => {
        dispatch(addDiscussion(newDiscussion));
        dispatch(fetchDiscussions());
    };

    return (
        <Grid container justifyContent="center" minHeight="100vh">
            <DiscussionList
                discussions={discussions}
                handleSubmitDialog={handleNewDiscussion}
            />
        </Grid>
    );
}

export default Discussion;
