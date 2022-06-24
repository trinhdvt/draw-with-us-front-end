import React from "react";
import {Button, Divider, Grid, Typography} from "@mui/material";
import {FaUserLock} from "react-icons/fa";
import {MdOutlinePrivacyTip} from "react-icons/md";
import {FcGoogle} from "react-icons/fc";

import FbLoginBtn from "./FbLoginBtn";

const LoginPanel = () => {
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
            <Grid item container className="my-auto">
                <Grid
                    item
                    md={6}
                    className="flex flex-col items-center justify-center"
                >
                    <FaUserLock className="primary-icon text-[40px]" />
                    <Typography
                        variant="h5"
                        className="capitalize mt-1 text-center"
                    >
                        Create Your Private Room
                    </Typography>
                </Grid>
                <Grid
                    item
                    md={6}
                    className="flex flex-col items-center justify-center"
                >
                    <MdOutlinePrivacyTip className="primary-icon text-[40px]" />
                    <Typography
                        variant="h5"
                        className="capitalize mt-1 text-center"
                    >
                        Create Your Own Collection
                    </Typography>
                </Grid>
            </Grid>
            <Divider
                orientation="horizontal"
                flexItem
                className="mt-auto"
                sx={{"&::before": {top: "0%"}, "&::after": {top: "0%"}}}
            >
                <Typography variant="h5">Login With</Typography>
            </Divider>
            <div className="flex justify-evenly mb-auto mt-2">
                <FbLoginBtn className="flex-1" />
                <div className="mx-7" />
                <Button
                    startIcon={<FcGoogle />}
                    variant="outlined"
                    className="flex-1"
                >
                    Google
                </Button>
            </div>
        </Grid>
    );
};

export default LoginPanel;
