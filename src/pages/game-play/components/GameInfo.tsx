import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import HistoryIcon from "@mui/icons-material/History";
import {useTranslation} from "react-i18next";

import SmallOutlineBtn from "./SmallOutlineBtn";
import HistoryModal from "./HistoryModal";
import GameInfoModal from "./GameInfoModal";

const GameInfo = () => {
    const {t} = useTranslation();
    const [showInfo, setShowInfo] = React.useState(false);
    const [openHistory, setOpenHistory] = React.useState(false);
    const closeHistory = () => setOpenHistory(false);
    const closeInfo = () => setShowInfo(false);

    return (
        <div className="grid grid-cols-[1fr_auto_1fr]">
            <SmallOutlineBtn
                startIcon={<InfoIcon />}
                onClick={() => setShowInfo(true)}
            >
                {t("game_play.game_info")}
            </SmallOutlineBtn>
            <div className="w-2" />
            <SmallOutlineBtn
                startIcon={<HistoryIcon />}
                color="secondary"
                onClick={() => setOpenHistory(true)}
            >
                {t("game_play.game_history")}
            </SmallOutlineBtn>
            {openHistory && <HistoryModal onClose={closeHistory} />}
            {showInfo && <GameInfoModal onClose={closeInfo} />}
        </div>
    );
};

export default GameInfo;
