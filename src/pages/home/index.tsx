import React from "react";
import {Divider, Grid, Typography} from "@mui/material";
import UserPanel from "./components/UserPanel";
import LoginPanel from "./components/LoginPanel";

const HomePage = () => {
    React.useEffect(() => {
        document.title = "Draw With Us";
    }, []);

    return (
        <Grid
            container
            justifyContent="space-evenly"
            className="bg-white rounded-xl"
        >
            <UserPanel />
            <Divider orientation="vertical" flexItem variant="middle">
                <Typography>OR</Typography>
            </Divider>
            <LoginPanel />
        </Grid>
    );
};

export default HomePage;
