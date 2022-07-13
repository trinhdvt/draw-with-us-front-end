import React from "react";
import {Divider, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

import {useUser} from "../../store/UserStore";

import PlayNowPanel from "./components/PlayNowPanel";
import LoginPanel from "./components/LoginPanel";
import YourCollection from "./components/YourCollection";

const HomePage = () => {
    const {t} = useTranslation();

    React.useEffect(() => {
        document.title = "Draw With Us";
    }, []);
    const token = useUser(state => state.token);
    const isLoggedIn = !!token;

    return (
        <div className="grid grid-cols-[1fr_auto_1fr] h-[270px] justify-evenly bg-white rounded-xl p-2">
            <PlayNowPanel />
            <Divider orientation="vertical" flexItem variant="middle">
                <Typography className="uppercase">{t("or")}</Typography>
            </Divider>
            {isLoggedIn ? <YourCollection /> : <LoginPanel />}
        </div>
    );
};

export default HomePage;
