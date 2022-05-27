import React from "react";
import {Button, Divider, Grid, Stack, Typography} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import DividerWithText from "../../../components/DividerWithText";
import CssTextField from "../../../components/CssTextField";

const LoginPanel = () => {
    return (
        <Grid
            item
            container
            className="mt-1"
            md={5}
            rowSpacing={2}
            direction="column"
            alignItems="center"
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
                    className="mb-[25px]"
                >
                    <Stack
                        direction="column"
                        divider={
                            <DividerWithText>
                                <Typography>OR</Typography>
                            </DividerWithText>
                        }
                        spacing={2}
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
            <Grid item justifyContent="space-evenly">
                <Stack direction="row" spacing={2}>
                    <Button startIcon={<FacebookIcon />} variant="outlined">
                        Facebook
                    </Button>
                    <Button startIcon={<GoogleIcon />} variant="outlined">
                        Google
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default LoginPanel;
