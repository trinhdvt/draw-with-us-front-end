import {createTheme} from "@mui/material";

export const appTheme = createTheme({
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
            fontSize: "2.5rem",
            fontWeight: 300,
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            lineHeight: "1.167",
            letterSpacing: "0.01071em",
        },
        h2: {
            fontSize: "2rem",
            fontWeight: 300,
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            lineHeight: "1.2",
            letterSpacing: "0.00714em",
        },
        h3: {
            fontSize: "1.5rem",
            fontWeight: 400,
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            lineHeight: "1.167",
            letterSpacing: "0.00457em",
        },
        h4: {
            fontSize: "1.25rem",
            fontWeight: 400,
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            lineHeight: "1.235",
            letterSpacing: "0.00119em",
        },
        h5: {
            fontSize: "1.125rem",
            fontWeight: 400,
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            lineHeight: "1.334",
            letterSpacing: "0.00079em",
        },
        h6: {
            fontSize: "1rem",
            fontWeight: 500,
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            lineHeight: "1.6",
            letterSpacing: "0.0015em",
        },
    },
});
