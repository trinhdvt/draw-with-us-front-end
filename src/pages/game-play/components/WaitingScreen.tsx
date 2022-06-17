import React from "react";
import {Button, Typography} from "@mui/material";
import {BsHourglassSplit} from "react-icons/bs";
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
}: WaitingScreenProps & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={styles.waitingScreen} {...others}>
            <Typography variant="h3">{title}</Typography>
            <BsHourglassSplit
                className={clsx(
                    "text-[80px] my-4 primary-icon",
                    styles.rotateAnimate
                )}
            />
            {children}
        </div>
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
