import React from "react";
import {Divider, Grid, Stack, styled, Typography} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import {Link} from "react-router-dom";

const StyledFooter = styled("footer")({
    marginTop: "20px",
});

const Footer = () => {
    const footerText = ["Gallery", "About Us", "Contact Us"];
    const footerLink = ["gallery", "#", "#"];
    const footerTxtComponent = () => {
        return footerText.map((item, index) => {
            return (
                <Link to={footerLink[index]} key={index}>
                    <Typography
                        key={index}
                        variant="body2"
                        color="textSecondary"
                        align="center"
                    >
                        {item}
                    </Typography>
                </Link>
            );
        });
    };

    return (
        <StyledFooter>
            <Grid container columns={2}>
                <Grid item md={1}>
                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={1}
                        justifyContent="center"
                        alignItems="center"
                    >
                        {footerTxtComponent()}
                    </Stack>
                </Grid>
                <Grid item md>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={1}
                    >
                        <FacebookIcon />
                        <GitHubIcon />
                        <InstagramIcon />
                    </Stack>
                </Grid>
            </Grid>
        </StyledFooter>
    );
};

export default Footer;
