import React from "react";
import {Button, Grid, GridProps, Typography} from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import clsx from "clsx";

import styles from "../../../assets/styles/WaitingScreen.module.scss";
import {useSocket} from "../../../context/SocketContext";

interface WaitingScreenProps {
    title: string;
    children?: React.ReactNode;
}

const WaitingScreen = ({
    children,
    title,
    ...others
}: WaitingScreenProps & GridProps) => {
    return (
        <Grid
            item
            container
            md={8}
            className="flex-col items-center justify-center bg-white rounded-xl h-[350px]"
            {...others}
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

const WaitOtherPlayer = () => (
    <WaitingScreen title="Waiting for other players" />
);

const WaitHost = () => (
    <WaitingScreen title="Waiting for host to start the game" />
);

const WaitEndTurn = () => (
    <WaitingScreen title="Waiting for other players to finish" />
);

const WaitNextTurn = () => <WaitingScreen title="Let's take a rest" />;

const ReadyToStartGame = () => {
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

export {WaitOtherPlayer, ReadyToStartGame, WaitHost, WaitEndTurn, WaitNextTurn};
