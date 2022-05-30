import React from "react";
import {Button, Grid, GridProps, Typography} from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import styles from "../../../assets/styles/WaitingScreen.module.scss";
import clsx from "clsx";
import {useSocket} from "../../../context/SocketContext";

interface WaitingScreenProps {
    title: string;
    children?: React.ReactNode;
}

const WaitingScreen = (props: WaitingScreenProps & GridProps) => {
    const {title, children, ...others} = props;
    return (
        <Grid
            {...others}
            item
            container
            md={8}
            alignItems="center"
            justifyContent="center"
            direction="column"
            className="bg-white rounded-xl min-h-[350px]"
        >
            <Typography variant="h3">{title}</Typography>
            <HourglassEmptyIcon
                color="primary"
                className={clsx("text-[100px] my-4", styles.rotateAnimate)}
            />
            {children}
        </Grid>
    );
};

const WaitingOthersPlayers = () => (
    <WaitingScreen title="Waiting for other players" />
);

const WaitingHost = () => (
    <WaitingScreen title="Waiting for host to start the game" />
);

const WaitingForGameStart = () => {
    const socket = useSocket();

    const onGameStart = () => {
        socket?.emit("game:start");
    };

    return (
        <WaitingScreen title="Other players is waiting ...">
            <span className="relative inline-flex">
                <Button variant="outlined" onClick={onGameStart}>
                    Start the game
                </Button>
                <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
            </span>
        </WaitingScreen>
    );
};

export {WaitingOthersPlayers, WaitingForGameStart, WaitingHost};
