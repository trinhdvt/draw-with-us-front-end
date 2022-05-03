import React from "react";
import {Box, LinearProgress, LinearProgressProps, Typography} from "@mui/material";

interface CountdownTimerProps extends LinearProgressProps {
    displayvalue: number;
}

const LinearProgressWithLabel = (props: CountdownTimerProps) => (
    <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box sx={{width: '100%', mr: 1}}>
            <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{minWidth: 35}}>
            <Typography variant="body2" color="text.primary">{`${props.displayvalue} S`}</Typography>
        </Box>
    </Box>
);

export default LinearProgressWithLabel;
