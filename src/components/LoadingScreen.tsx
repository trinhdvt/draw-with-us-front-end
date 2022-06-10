import React from "react";
import {CircularProgress, Typography} from "@mui/material";

type Props = {
    size?: number;
    text?: string;
};

const AnimatedLoading = ({size, text}: Props) => (
    <div className="flex flex-col justify-center items-center top-0 left-0 w-full h-full z-50 absolute bg-white opacity-75 ">
        <CircularProgress size={size ?? 300} thickness={1} className="mb-10" />
        <Typography variant="h3" className="animate-bounce">
            {text ?? "Loading ..."}
        </Typography>
    </div>
);

export {AnimatedLoading};
