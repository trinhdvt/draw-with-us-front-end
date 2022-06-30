import React from "react";
import {Divider, Grid, Typography} from "@mui/material";

import {useUser} from "../../store/UserStore";

import PlayNowPanel from "./components/PlayNowPanel";
import LoginPanel from "./components/LoginPanel";
import ListCreatedCollection from "./components/ListCreatedCollection";

const HomePage = () => {
    React.useEffect(() => {
        document.title = "Draw With Us";
    }, []);
    const token = useUser(state => state.token);
    const isLoggedIn = !!token;

    return (
        <Grid
            container
            className="h-[270px] justify-evenly bg-white rounded-xl pb-2"
        >
            <PlayNowPanel item container md={5} xs={5} />
            <Divider orientation="vertical" flexItem variant="middle">
                <Typography>OR</Typography>
            </Divider>
            {isLoggedIn ? (
                <ListCreatedCollection item container md={5} xs={5} />
            ) : (
                <LoginPanel item container md={5} xs={5} />
            )}
        </Grid>
    );
};

export default HomePage;
