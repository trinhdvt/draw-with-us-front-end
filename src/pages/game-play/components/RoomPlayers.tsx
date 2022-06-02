import React from "react";
import Player, {PlayerSkeleton} from "./Player";
import {Divider, Stack} from "@mui/material";
import {useParams} from "react-router-dom";
import {usePlayers} from "../../../api/services/RoomServices";

const RoomPlayers = () => {
    const {roomId} = useParams();
    const {data} = usePlayers(roomId);

    const GenerateSkeleton = (amount: number) => {
        const arr = [];
        for (let i = 0; i < amount; i++) {
            arr.push(<PlayerSkeleton key={i} />);
        }
        return arr;
    };

    return (
        <Stack
            spacing={1}
            divider={<Divider orientation="horizontal" flexItem />}
        >
            {data?.map((user, idx) => (
                <Player key={idx} {...user} />
            ))}
            {GenerateSkeleton(10 - (data?.length ?? 0))}
        </Stack>
    );
};

export default RoomPlayers;
