import React from "react";
import {Divider, Grid, GridProps, Typography} from "@mui/material";
import {FaUserLock} from "react-icons/fa";
import {MdOutlineCollections} from "react-icons/md";
import {GiRank3} from "react-icons/gi";

import FbLoginBtn from "./FbLoginBtn";
import GoogleLoginBtn from "./GoogleLoginBtn";

const LoginPanel = (props: GridProps) => (
    <Grid
        className="w-full grid grid-rows-[1fr_4fr_auto] items-center"
        {...props}
    >
        <Typography variant="h2" className="uppercase text-center">
            Login Here
        </Typography>
        <div className="grid grid-cols-3 gap-x-1  my-auto">
            <div className="flex flex-col items-center justify-center">
                <FaUserLock className="primary-icon text-[40px]" />
                <Typography
                    variant="body1"
                    className="capitalize mt-1 text-center"
                >
                    Create Your Private Room
                </Typography>
            </div>
            <div className="flex flex-col items-center justify-center">
                <MdOutlineCollections className="primary-icon text-[40px]" />
                <Typography
                    variant="body1"
                    className="capitalize mt-1 text-center"
                >
                    Create Your Collection
                </Typography>
            </div>
            <div className="flex flex-col items-center justify-center">
                <GiRank3 className="primary-icon text-[40px]" />
                <Typography
                    variant="body1"
                    className="capitalize mt-1 text-center"
                >
                    Get Placed In Hall Of Fame
                </Typography>
            </div>
        </div>
        <div>
            <Divider
                orientation="horizontal"
                flexItem
                sx={{"&::before": {top: "0%"}, "&::after": {top: "0%"}}}
            >
                <Typography variant="h5">Login With</Typography>
            </Divider>
            <div className="w-2/3 flex justify-center mt-1 mx-auto">
                <FbLoginBtn fullWidth />
                <div className="mx-2" />
                <GoogleLoginBtn fullWidth />
            </div>
        </div>
    </Grid>
);

export default LoginPanel;
