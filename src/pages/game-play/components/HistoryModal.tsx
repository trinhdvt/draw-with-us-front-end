import React from "react";
import {Grid, IconButton, Typography} from "@mui/material";
import clsx from "clsx";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import {useTranslation} from "react-i18next";

import styles from "../../../assets/styles/Game.module.scss";
import {useGame} from "../context/GameContext";
import TopicList from "../../gallery/components/TopicList";

type HistoryModalProps = {
    onClose: () => void;
};

const HistoryModal = ({onClose}: HistoryModalProps) => {
    const {t} = useTranslation();
    const {gameState} = useGame();
    const playedTopics = Array.from(gameState.history);

    return (
        <div className="modal">
            <Grid
                maxWidth="md"
                className={clsx("flex flex-col rounded-xl", styles.centerModal)}
            >
                <div className="grid grid-cols-[1fr_11fr_1fr] items-center mb-2">
                    <div />
                    <Typography variant="h3" className="capitalize text-center">
                        {t("game_play.game_history")}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CancelPresentationIcon color="error" />
                    </IconButton>
                </div>
                <TopicList data={playedTopics} />
            </Grid>
        </div>
    );
};

export default HistoryModal;
