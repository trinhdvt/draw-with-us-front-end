import React from "react";
import {MenuItem} from "@mui/material";

import {ShowMode, useRoomStore} from "../store/RoomStore";
import CssSelect from "../../../components/CssSelect";

const ShowModeSelector = () => {
    const {roomShowMode, setRoomShowMode} = useRoomStore();
    return (
        <CssSelect
            size="small"
            value={roomShowMode}
            onChange={e => setRoomShowMode(e.target.value as ShowMode)}
        >
            <MenuItem value={ShowMode.ROOM_NAME}>Room&apos;s name</MenuItem>
            <MenuItem value={ShowMode.COLLECTION_NAME}>
                Collection&apos;s name
            </MenuItem>
        </CssSelect>
    );
};

export default ShowModeSelector;
