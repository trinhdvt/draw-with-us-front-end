import {Divider, Grid} from "@mui/material";
import React from "react";
import UserPanel from "./UserPanel";
import {makeStyles} from "@mui/styles";
import LoginPanel from "./LoginPanel";

const useStyles = makeStyles({
    root: {
        borderRadius: 12,
        backgroundColor: "#fff",
    },
});

const HomePage = () => {
    const classes = useStyles();

    return (
        <Grid container justifyContent="space-evenly" className={classes.root}>
            <UserPanel />
            <Divider orientation="vertical" flexItem variant="middle">
                OR
            </Divider>
            <LoginPanel />
        </Grid>
    );
};

export default HomePage;
