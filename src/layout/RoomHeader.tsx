import React from "react";
import {Button, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface HeaderProps {
    title: string;
    headerChildren?: React.ReactNode;
    endChildren?: React.ReactNode;
}

const RoomHeader = ({title, headerChildren, endChildren}: HeaderProps) => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    return (
        <div className="grid grid-cols-[1fr_auto_1fr] w-full mb-2.5">
            <div className="flex items-center">
                <Button
                    startIcon={<ArrowBackIcon />}
                    className="mr-2.5 rounded-xl border-[2px] border-solid border-[#9fbdca]"
                    onClick={() => navigate(-1)}
                >
                    {t("back")}
                </Button>
                {headerChildren}
            </div>
            <div className="flex justify-center items-center ">
                <Typography variant="h3" className="uppercase">
                    {title}
                </Typography>
            </div>
            <div className="ml-auto">{endChildren}</div>
        </div>
    );
};

export default RoomHeader;
export type {HeaderProps};
