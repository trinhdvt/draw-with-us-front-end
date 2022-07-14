import React from "react";
import {Button, Typography} from "@mui/material";
import {BsHourglassSplit} from "react-icons/bs";
import clsx from "clsx";
import {useTranslation} from "react-i18next";

import i18n from "../../../i18n/config";
import styles from "../../../assets/styles/WaitingScreen.module.scss";
import {useSocket} from "../../../store/SocketStore";

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
            <Typography variant="h3" textAlign="center">
                {title}
            </Typography>
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
    <WaitingScreen title={i18n.t("game_play.waiting_screen.wait_other")} />
);

const WaitHost = () => (
    <WaitingScreen title={i18n.t("game_play.waiting_screen.wait_host")} />
);

const WaitEndTurn = () => (
    <WaitingScreen title={i18n.t("game_play.waiting_screen.wait_end_turn")} />
);

const WaitNextTurn = () => (
    <WaitingScreen title={i18n.t("game_play.waiting_screen.wait_next_turn")} />
);

const PausedGame = () => <WaitingScreen title={"The game has been paused"} />;

const ReadyToStartGame = () => {
    const {t} = useTranslation();
    const socket = useSocket();
    const onGameStart = () => socket?.emit("game:start");

    return (
        <WaitingScreen title={t("game_play.waiting_screen.ready_to_start")}>
            <span className="relative inline-flex">
                <Button variant="outlined" onClick={onGameStart}>
                    {t("game_play.start_the_game")}
                </Button>
                <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
            </span>
        </WaitingScreen>
    );
};

export {
    WaitOtherPlayer,
    ReadyToStartGame,
    WaitHost,
    WaitEndTurn,
    WaitNextTurn,
    PausedGame,
};
