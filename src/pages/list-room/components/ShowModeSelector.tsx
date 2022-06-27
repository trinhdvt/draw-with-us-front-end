import React from "react";
import {MenuItem, Select} from "@mui/material";

import {ShowMode, useRoomStore} from "../store/RoomStore";

const ShowModeSelector = () => {
    const {roomShowMode, setRoomShowMode} = useRoomStore();
    return (
        <Select
            size="small"
            value={roomShowMode}
            onChange={e => setRoomShowMode(e.target.value as ShowMode)}
        >
            <MenuItem value={ShowMode.ROOM_NAME}>Room&apos;s name</MenuItem>
            <MenuItem value={ShowMode.COLLECTION_NAME}>
                Collection&apos;s name
            </MenuItem>
        </Select>
    );
};

export default ShowModeSelector;
