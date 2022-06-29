import React from "react";
import {Button, Grid, GridProps, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";

import styles from "../assets/styles/Room.module.scss";

interface HeaderProps {
    title: string;
    headerChildren?: React.ReactNode;
    endChildren?: React.ReactNode;
}

const RoomHeader = (props: HeaderProps & GridProps) => {
    const navigate = useNavigate();
    const {title, headerChildren, endChildren, ...others} = props;

    return (
        <Grid
            container
            alignItems="center"
            className={styles.header}
            {...others}
        >
            <Grid item container md={5} alignItems="center">
                <Button
                    startIcon={<ArrowBackIcon />}
                    className="mr-2.5 rounded-xl border-[2px] border-solid border-[#9fbdca]"
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
                {headerChildren}
            </Grid>
            <Grid item container md>
                <Typography variant="h3" className="uppercase">
                    {title}
                </Typography>
            </Grid>
            <Grid item>{endChildren}</Grid>
        </Grid>
    );
};

export default RoomHeader;
export type {HeaderProps};
