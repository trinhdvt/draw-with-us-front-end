import React from "react";
import {Grid, styled} from "@mui/material";
import logoImg from "../../../assets/images/logo.svg";
import {useNavigate} from "react-router-dom";

const Logo = styled("img")({
    width: "auto",
    height: "90px",
    "&:hover": {
        cursor: "pointer",
    },
});

const Header = () => {
    const navigate = useNavigate();

    return (
        <Grid container justifyContent="center" className="mb-[20px]">
            <Grid item container xs={6} direction="column" alignItems="center">
                <Grid item className="mb-[10px]">
                    <Logo
                        src={logoImg}
                        alt="logo"
                        loading="lazy"
                        onClick={() => navigate("/")}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Header;
