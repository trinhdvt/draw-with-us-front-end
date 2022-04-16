import React from "react";
import Grid from "@mui/material/Grid";
import CommonButton from "../commons/CommonButton";
import { Typography } from "@mui/material";

import NotificationBell from "../commons/NotificationBell";

const Authentication = () => {
    return (
        <Grid item xs={0}>
            <Typography>This is authentication</Typography>
            {/* <CommonButton variant="outlined">Text</CommonButton> */}
            <NotificationBell color="primary" badgeContent={4} />

        </Grid>
    )
}

export default Authentication;