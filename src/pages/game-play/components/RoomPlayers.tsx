import React from "react";
import FlipMove from "react-flip-move";
import Player, {PlayerSkeleton} from "./Player";
import {useParams} from "react-router-dom";
import {usePlayers} from "../../../api/services/RoomServices";
import {useUser} from "../../../context/UserContext";

const RoomPlayers = () => {
    const {roomId} = useParams();
    const {data} = usePlayers(roomId);
    const {user} = useUser();

    const GenerateSkeleton = (amount: number) => {
        return Array.from({length: amount}, (_, idx) => (
            <PlayerSkeleton key={idx} />
        ));
    };

    return (
        <>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/*
            // @ts-ignore */}
            <FlipMove
                className="flex flex-col"
                easing="ease"
                staggerDurationBy={15}
                staggerDelayBy={20}
                duration={700}
                delay={0}
            >
                {data?.map(player => (
                    <Player
                        key={player.eid}
                        {...player}
                        isMe={player.eid == user.eid}
                    />
                ))}
            </FlipMove>
            {GenerateSkeleton(10 - (data?.length ?? 0))}
        </>
    );
};

export default RoomPlayers;
