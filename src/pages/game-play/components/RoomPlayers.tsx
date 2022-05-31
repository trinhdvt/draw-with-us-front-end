import React from "react";
import Player from "./Player";
import {Divider, Stack} from "@mui/material";
import {useParams} from "react-router-dom";
import {usePlayers} from "../../../api/services/RoomServices";

const RoomPlayers = () => {
    const {roomId} = useParams();
    const {data} = usePlayers(roomId);

    return (
        <Stack
            spacing={1}
            divider={<Divider orientation="horizontal" flexItem />}
        >
            {data?.map((user, idx) => (
                <Player key={idx} {...user} />
            ))}
        </Stack>
    );
};

export default RoomPlayers;
