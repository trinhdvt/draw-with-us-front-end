import React from "react";
import {Divider, Grid, GridProps, Typography} from "@mui/material";
import {FaUserLock} from "react-icons/fa";
import {MdOutlineCollections} from "react-icons/md";
import {GiRank3} from "react-icons/gi";
import {useTranslation} from "react-i18next";

import FbLoginBtn from "./FbLoginBtn";
import GoogleLoginBtn from "./GoogleLoginBtn";

const LoginPanel = (props: GridProps) => {
    const {t} = useTranslation();

    return (
        <Grid
            className="w-full grid grid-rows-[1fr_4fr_auto] items-center"
            {...props}
        >
            <Typography variant="h2" className="uppercase text-center">
                {t("login_here")}
            </Typography>
            <div className="grid grid-cols-3 gap-x-1  my-auto">
                <div className="flex flex-col items-center justify-center">
                    <FaUserLock className="primary-icon text-[40px]" />
                    <Typography
                        variant="body1"
                        className="capitalize mt-1 text-center"
                    >
                        {t("create_private_room")}
                    </Typography>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <MdOutlineCollections className="primary-icon text-[40px]" />
                    <Typography
                        variant="body1"
                        className="capitalize mt-1 text-center"
                    >
                        {t("create_collection")}
                    </Typography>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <GiRank3 className="primary-icon text-[40px]" />
                    <Typography
                        variant="body1"
                        className="capitalize mt-1 text-center"
                    >
                        {t("get_in_hall_of_fame")}
                    </Typography>
                </div>
            </div>
            <div>
                <Divider
                    orientation="horizontal"
                    flexItem
                    sx={{"&::before": {top: "0%"}, "&::after": {top: "0%"}}}
                >
                    <Typography variant="body1">{t("login_with")}</Typography>
                </Divider>
                <div className="w-2/3 flex justify-center mt-1 mx-auto">
                    <FbLoginBtn fullWidth />
                    <div className="mx-2" />
                    <GoogleLoginBtn fullWidth />
                </div>
            </div>
        </Grid>
    );
};

export default LoginPanel;
