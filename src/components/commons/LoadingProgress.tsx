import React from "react";
import {CircularProgress} from "@mui/material";

function LoadingProgress() {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <CircularProgress size={300} thickness={1} />
        </div>
    );
}

export default LoadingProgress;
