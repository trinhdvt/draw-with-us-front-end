import React from "react";
import {Grid, styled} from "@mui/material";
import Logo from "../../../assets/images/logo.svg";

const Img = styled("img")({
    width: "auto",
    height: "90px",
});

const headerStyles = {
    marginBottom: "20px",
};
const logoStyles = {
    marginBottom: "10px",
};

const Header = () => {
    return (
        <Grid container justifyContent="center" sx={headerStyles}>
            <Grid item container xs={6} direction="column" alignItems="center">
                <Grid item sx={logoStyles}>
                    <Img src={Logo} alt="logo" />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Header;
