import React from "react";
import {Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";

const AppHeader = () => {
    const navigate = useNavigate();
    const logoUrl = "https://cdn.trinhdvt.tech/logo.svg";

    return (
        <Grid container justifyContent="center" className="mb-4">
            <img
                src={logoUrl}
                className="hover:cursor-pointer"
                width="auto"
                height="80px"
                alt="logo"
                onClick={() => navigate("/", {replace: true})}
            />
        </Grid>
    );
};

export default AppHeader;
