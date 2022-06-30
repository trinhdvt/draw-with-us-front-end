import React from "react";
import {Grid, GridProps, Typography} from "@mui/material";

const ListCreatedCollection = (props: GridProps) => (
    <Grid className="w-full flex flex-col items-center" {...props}>
        <Typography variant="h2" className="uppercase text-center">
            Your collection
        </Typography>
        <Grid
            item
            md
            xs
            className="flex flex-col rounded-xl bg-[#a0bdc9] scrollBar
                h-full w-full mt-2 max-h-full overflow-y-scroll items-center justify-center"
        >
            <Typography variant="body1">Not implemented yet.</Typography>
        </Grid>
    </Grid>
);

export default ListCreatedCollection;
