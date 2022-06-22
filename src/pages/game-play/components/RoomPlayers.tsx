import React from "react";
import FlipMove from "react-flip-move";
import clsx from "clsx";

import {usePlayers} from "../../../api/services/RoomServices";
import {useUser} from "../../../store/UserStore";
import {useGame} from "../context/GameContext";
import styles from "../../../assets/styles/Game.module.scss";

import Player, {PlayerSkeleton} from "./Player";

const RoomPlayers = () => {
    const {gameState} = useGame();
    const {data} = usePlayers(gameState.roomId);
    const {user} = useUser();

    const GenerateSkeleton = (amount: number) => {
        return Array.from({length: amount}, (_, idx) => (
            <PlayerSkeleton key={idx} />
        ));
    };

    return (
        <div className={clsx(styles.playerList, "scrollBar")}>
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
                        isMe={player.eid === user.eid}
                    />
                ))}
            </FlipMove>
            {GenerateSkeleton(10 - (data?.length ?? 0))}
        </div>
    );
};

export default RoomPlayers;
