import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ReportDialog from "./ReportDialog.jsx";
import {
    Grid
} from "@mui/material";
import React, {useState} from "react";
import ReportItem from "./ReportItem.jsx";
import {sortByCreatedAt} from "../utils/date.js";


function ReportList({reports, handleSubmitReport}) {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Grid item sm={12} md={7} sx={{ px: { xs: 2, md: 0 } }}>
            <Box sx={{ my: { xs: 1, md: 3 } }}>
                <Button variant="contained" onClick={handleOpenDialog}>
                    Create New Report
                </Button>
                <ReportDialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    onSubmit={handleSubmitReport}
                />

                {sortByCreatedAt(reports).map((report) => (
                    <ReportItem key={report.id} report={report}/>
                ))}
            </Box>
        </Grid>
    );
}

export default ReportList;
