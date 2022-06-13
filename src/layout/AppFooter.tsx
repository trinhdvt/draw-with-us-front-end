import React from "react";
import {Divider, Grid, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const AppFooter = () => {
    const footerText = ["Gallery", "About Us", "Contact Us"];
    const footerLink = ["/gallery", "#", "#"];

    return (
        <footer className="mt-[5px] ml-[5px]">
            <Grid container columns={2}>
                <Grid item md={1}>
                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={1}
                        alignItems="center"
                    >
                        {footerText.map((item, index) => (
                            <Link
                                to={footerLink[index]}
                                key={index}
                                className="no-underline"
                            >
                                <Typography
                                    key={index}
                                    variant="body2"
                                    color="textSecondary"
                                    align="center"
                                >
                                    {item}
                                </Typography>
                            </Link>
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </footer>
    );
};

export default AppFooter;
