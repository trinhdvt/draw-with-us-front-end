import React from "react";
import Player from "./Player";
import {Divider, Stack} from "@mui/material";
import {useParams} from "react-router-dom";
import {usePlayers} from "../../../api/services/RoomServices";
import {useSocket} from "../../../context/SocketContext";
import {useQueryClient} from "react-query";

const RoomPlayers = () => {
    const {roomId} = useParams();
    const {data} = usePlayers(roomId);
    const socket = useSocket();
    const queryClient = useQueryClient();

    React.useEffect(() => {
        socket?.on("room:update", async () => {
            await queryClient.invalidateQueries(["room-players", roomId]);
        });
        return () => {
            socket?.off("room:update");
        };
    }, [queryClient, roomId, socket]);

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
