import React from "react";
import {Grid, styled} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Logo = styled("img")({
    width: "auto",
    height: "80px",
    "&:hover": {
        cursor: "pointer",
    },
});

const AppHeader = () => {
    const navigate = useNavigate();
    const logoUrl = "https://cdn.trinhdvt.tech/logo.svg";

    return (
        <Grid container justifyContent="center" className="mb-[15px]">
            <Logo
                src={logoUrl}
                alt="logo"
                loading="lazy"
                onClick={() => navigate("/", {replace: true})}
            />
        </Grid>
    );
};

export default AppHeader;
