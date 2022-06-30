import React from "react";
import {Grid, GridProps, Typography} from "@mui/material";

const ListCreatedCollection = (props: GridProps) => {
    return (
        <Grid className="flex-col items-center mt-1" {...props}>
            <Typography variant="h2" className="uppercase text-center">
                Your collection
            </Typography>
            <Grid
                item
                md
                xs
                className="flex flex-col rounded-xl bg-[#a0bdc9] scrollBar
                h-full w-full mt-2 max-h-full overflow-y-scroll"
            ></Grid>
        </Grid>
    );
};

export default ListCreatedCollection;
