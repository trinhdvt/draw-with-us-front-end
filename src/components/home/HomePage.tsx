import {Divider, Grid} from "@mui/material";
import React from "react";
import UserPanel from "./UserPanel";
import LoginPanel from "./LoginPanel";

const HomePage = () => {
    return (
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
};

export default HomePage;
