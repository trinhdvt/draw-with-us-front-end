import React from "react";
import {Grid, Typography} from "@mui/material";

const ListCreatedCollection = () => {
    return (
        <Grid item container md={5} className="flex-col items-center mt-1">
            <Typography variant="h2" className="uppercase text-center">
                Your collection
            </Typography>
            <Grid
                item
                md
                className="flex flex-col rounded-xl bg-[#a0bdc9] scrollBar
                h-full w-full mt-2 max-h-full overflow-y-scroll"
            ></Grid>
        </Grid>
    );
};

export default ListCreatedCollection;
