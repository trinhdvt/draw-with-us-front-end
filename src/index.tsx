import React from "react";
import ReactDOM from "react-dom/client";
import {ThemeProvider} from "@mui/material";

import App from "./App";
import {appTheme} from "./AppTheme";
import "./index.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <ThemeProvider theme={appTheme}>
        <App />
    </ThemeProvider>
);
