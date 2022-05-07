import React from "react";
import {CircularProgress} from "@mui/material";

function LoadingProgress() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: window.innerWidth,
                height: window.innerHeight,
            }}
        >
            <CircularProgress size={300} thickness={1} />
        </div>
    );
}

export default LoadingProgress;
