import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import HistoryIcon from "@mui/icons-material/History";
import {useTranslation} from "react-i18next";
import {IconButton} from "@mui/material";

import SmallOutlineBtn from "./SmallOutlineBtn";
import HistoryModal from "./HistoryModal";
import GameInfoModal from "./GameInfoModal";
import PauseGameBtn from "./PauseGameBtn";

type Props = {
    isHostLayout?: boolean;
};

const GameInfo = ({isHostLayout}: Props) => {
    const {t} = useTranslation();
    const [showInfo, setShowInfo] = React.useState(false);
    const [openHistory, setOpenHistory] = React.useState(false);
    const closeHistory = () => setOpenHistory(false);
    const closeInfo = () => setShowInfo(false);

    const HostLayout = () => (
        <div className="grid grid-cols-[auto_auto_auto]">
            <IconButton
                size="small"
                onClick={() => setShowInfo(true)}
                edge="start"
                color="primary"
            >
                <InfoIcon />
            </IconButton>
            <SmallOutlineBtn
                startIcon={<HistoryIcon />}
                color="secondary"
                onClick={() => setOpenHistory(true)}
                className="mr-2 p-0"
            >
                {t("game_play.game_history")}
            </SmallOutlineBtn>
            <PauseGameBtn />
        </div>
    );

    const NormalLayout = () => (
        <div className="grid grid-cols-2 gap-x-2">
            <SmallOutlineBtn
                startIcon={<InfoIcon />}
                onClick={() => setShowInfo(true)}
            >
                {t("game_play.game_info")}
            </SmallOutlineBtn>
            <SmallOutlineBtn
                startIcon={<HistoryIcon />}
                color="secondary"
                onClick={() => setOpenHistory(true)}
            >
                {t("game_play.game_history")}
            </SmallOutlineBtn>
        </div>
    );

    return (
        <React.Fragment>
            {isHostLayout ? <HostLayout /> : <NormalLayout />}
            {openHistory && <HistoryModal onClose={closeHistory} />}
            {showInfo && <GameInfoModal onClose={closeInfo} />}
        </React.Fragment>
    );
};

export default React.memo(GameInfo);
