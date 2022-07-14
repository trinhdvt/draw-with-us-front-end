import React from "react";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import {useTranslation} from "react-i18next";

import {useSocket} from "../../../store/SocketStore";
import Toast from "../utils/GameNotify";

import SmallOutlineBtn from "./SmallOutlineBtn";

const PauseGameBtn = () => {
    const {t} = useTranslation();
    const [isPauseGame, setPaused] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const socket = useSocket();

    const onPause = () => {
        socket?.emit("game:pause", ({isPaused, message}) => {
            if (isPaused) {
                setPaused(prev => !prev);
                setDisabled(true);
                const title = isPauseGame
                    ? t("pause_game.resumed_msg")
                    : t("pause_game.paused_msg");

                setTimeout(() => setDisabled(false), 3e3);
                Toast.fire({icon: "success", title}).then();
            }
            if (message) {
                const title = message as string;
                Toast.fire({icon: "error", title}).then();
            }
        });
    };

    return (
        <SmallOutlineBtn
            startIcon={isPauseGame ? <PlayCircleIcon /> : <PauseCircleIcon />}
            color="warning"
            onClick={onPause}
            disabled={disabled}
            className="p-0"
        >
            {isPauseGame ? t("pause_game.paused") : t("pause_game.resumed")}
        </SmallOutlineBtn>
    );
};

export default PauseGameBtn;
