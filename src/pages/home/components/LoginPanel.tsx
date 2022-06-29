import React from "react";
import {Divider, Grid, Typography} from "@mui/material";
import {FaUserLock} from "react-icons/fa";
import {MdOutlinePrivacyTip} from "react-icons/md";

import FbLoginBtn from "./FbLoginBtn";
import GoogleLoginBtn from "./GoogleLoginBtn";

const LoginPanel = () => (
    <Grid item container md={5} className="flex-col items-center mt-1">
        <Typography variant="h2" className="uppercase text-center">
            Login Here
        </Typography>
        <div className="grid grid-cols-2 my-auto">
            <div className="flex flex-col items-center justify-center">
                <FaUserLock className="primary-icon text-[40px]" />
                <Typography
                    variant="h5"
                    className="capitalize mt-1 text-center"
                >
                    Create Your Private Room
                </Typography>
            </div>
            <div className="flex flex-col items-center justify-center">
                <MdOutlinePrivacyTip className="primary-icon text-[40px]" />
                <Typography
                    variant="h5"
                    className="capitalize mt-1 text-center"
                >
                    Create Your Own Collection
                </Typography>
            </div>
        </div>
        <Divider
            orientation="horizontal"
            flexItem
            sx={{"&::before": {top: "0%"}, "&::after": {top: "0%"}}}
        >
            <Typography variant="h5">Login With</Typography>
        </Divider>
        <div className="flex justify-evenly mt-2">
            <FbLoginBtn className="flex-1" />
            <div className="mx-4" />
            <GoogleLoginBtn className="flex-1" />
        </div>
    </Grid>
);

export default LoginPanel;
