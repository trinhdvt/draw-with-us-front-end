import React from "react";
import {Divider, Grid} from "@mui/material";
import UserPanel from "./components/UserPanel";
import LoginPanel from "./components/LoginPanel";

const HomePage = () => (
    <Grid
        container
        justifyContent="space-evenly"
        className="bg-white rounded-xl"
    >
        <UserPanel />
        <Divider orientation="vertical" flexItem variant="middle">
            OR
        </Divider>
        <LoginPanel />
    </Grid>
);

export default HomePage;