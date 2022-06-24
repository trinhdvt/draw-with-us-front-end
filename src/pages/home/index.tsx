import React from "react";
import {Divider, Grid, Typography} from "@mui/material";

import {useUser} from "../../store/UserStore";

import UserPanel from "./components/UserPanel";
import LoginPanel from "./components/LoginPanel";
import ListCreatedCollection from "./components/ListCreatedCollection";

const HomePage = () => {
    React.useEffect(() => {
        document.title = "Draw With Us";
    }, []);

    const token = useUser(state => state.token);
    return (
        <Grid container className="bg-white rounded-xl justify-evenly">
            <UserPanel />
            <Divider orientation="vertical" flexItem variant="middle">
                <Typography>OR</Typography>
            </Divider>
            {token ? <ListCreatedCollection /> : <LoginPanel />}
        </Grid>
    );
};

export default HomePage;
