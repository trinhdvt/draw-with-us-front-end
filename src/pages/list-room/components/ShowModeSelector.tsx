import React from "react";
import {MenuItem} from "@mui/material";
import {useTranslation} from "react-i18next";

import {ShowMode, useRoomStore} from "../store/RoomStore";
import CssSelect from "../../../components/CssSelect";

const ShowModeSelector = () => {
    const {t} = useTranslation();
    const {roomShowMode, setRoomShowMode} = useRoomStore();
    return (
        <CssSelect
            size="small"
            value={roomShowMode}
            onChange={e => setRoomShowMode(e.target.value as ShowMode)}
        >
            <MenuItem value={ShowMode.ROOM_NAME}>
                {t("list_room.selector.name")}
            </MenuItem>
            <MenuItem value={ShowMode.COLLECTION_NAME}>
                {t("list_room.selector.collection")}
            </MenuItem>
        </CssSelect>
    );
};

export default ShowModeSelector;
