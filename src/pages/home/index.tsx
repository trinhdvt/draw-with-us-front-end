import React from "react";
import {Divider, Typography} from "@mui/material";

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
        <div className="grid grid-cols-[1fr_auto_1fr] h-[270px] justify-evenly bg-white rounded-xl p-2">
            <PlayNowPanel />
            <Divider orientation="vertical" flexItem variant="middle">
                <Typography>OR</Typography>
            </Divider>
            {isLoggedIn ? <ListCreatedCollection /> : <LoginPanel />}
        </div>
    );
};

export default HomePage;
