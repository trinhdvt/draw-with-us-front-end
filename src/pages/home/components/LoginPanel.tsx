import React from "react";
import {Button, Divider, Grid, Stack, Typography} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import queryString from "query-string";

import CssTextField from "../../../components/CssTextField";
import DividerWithText from "../../../components/DividerWithText";

const LoginPanel = () => {
    const fbLoginUrl = () => {
        let clientId = "406293024760126";
        let redirectUri = "https://draw-with.trinhdvt.tech/login/fb/callback";
        if (import.meta.env.DEV) {
            clientId = "438978628228056";
            redirectUri = "http://localhost:3000/login/fb/callback";
        }

        const params = queryString.stringify({
            client_id: clientId,
            redirect_uri: redirectUri,
            scope: ["email", "public_profile"].join(","),
            response_type: "code",
            display: "popup",
        });

        return `https://www.facebook.com/v14.0/dialog/oauth?${params}`;
    };

    const loginFb = () => (window.location.href = fbLoginUrl());

    return (
        <Grid
            item
            container
            md={5}
            rowSpacing={2}
            className="flex-col items-center mt-1"
        >
            <Grid item>
                <Typography variant="h2" className="uppercase text-center">
                    Login Here
                </Typography>
            </Grid>
            <Grid
                item
                container
                columnSpacing={2}
                justifyContent="space-evenly"
                component="form"
            >
                <Grid
                    item
                    container
                    md={5}
                    justifyContent="space-around"
                    alignItems="center"
                    direction="column"
                >
                    <Grid item xs={5}>
                        <CssTextField required size="small" label="Email" />
                    </Grid>
                    <Grid item xs={5}>
                        <CssTextField
                            required
                            label="Password"
                            size="small"
                            type="password"
                        />
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    md={5}
                    justifyContent="space-evenly"
                    className="mb-6"
                >
                    <Stack
                        divider={
                            <DividerWithText>
                                <Typography>OR</Typography>
                            </DividerWithText>
                        }
                        spacing={1}
                    >
                        <Button
                            startIcon={<MeetingRoomIcon />}
                            variant="contained"
                        >
                            Sign In
                        </Button>
                        <Button
                            startIcon={<SportsEsportsIcon />}
                            variant="outlined"
                        >
                            Sign Up
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
            <Divider
                orientation="horizontal"
                flexItem
                sx={{"&::before": {top: "0%"}, "&::after": {top: "0%"}}}
            >
                <Typography>Login With</Typography>
            </Divider>
            <Grid item container justifyContent="space-evenly" className="pt-6">
                <Button
                    startIcon={<FacebookIcon />}
                    variant="outlined"
                    onClick={loginFb}
                >
                    Facebook
                </Button>

                <Button startIcon={<GoogleIcon />} variant="outlined">
                    Google
                </Button>
            </Grid>
        </Grid>
    );
};

export default LoginPanel;
