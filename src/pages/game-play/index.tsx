import React from "react";
import {Grid, Typography} from "@mui/material";

import styles from "../../assets/styles/Game.module.scss";
import {RoomStatus} from "../../api/@types/Room";
import {useRoom} from "../../api/services/RoomServices";
import {useSocket} from "../../context/SocketContext";
import ITopic from "../../api/@types/Topic";

import {
    WaitEndTurn,
    ReadyToStartGame,
    WaitNextTurn,
    WaitHost,
    WaitOtherPlayer,
} from "./components/WaitingScreen";
import CountdownTimer from "./components/CountdownTimer";
import DrawBoard from "./components/DrawBoard";
import RoomPlayers from "./components/RoomPlayers";
import GameProvider, {GameActionType, useGame} from "./context/GameContext";
import {timeUp} from "./utils/GameNotify";
import Wrapper from "./Wrapper";
import MessagePanel from "./components/MessagePanel";

const Game = () => {
    const socket = useSocket();
    const {state, dispatch} = useGame();
    const {data} = useRoom(state.roomId);
    const isPlaying = data?.status === RoomStatus.PLAYING;

    React.useEffect(() => {
        socket?.on("game:nextTurn", (topic: ITopic) => {
            dispatch({type: GameActionType.NEXT_TURN, payload: topic});
        });

        socket?.on("game:endTurn", async () => {
            dispatch({type: GameActionType.END_TURN});
            if (!state.isDone && isPlaying) {
                await timeUp();
            }
        });
        return () => {
            socket?.off("game:nextTurn");
            socket?.off("game:endTurn");
        };
    }, [state.isDone, socket, dispatch, isPlaying]);

    const GameWaitingScreen = () => {
        if (isPlaying) return;
        const isHost = data?.isHost;
        const isReadyForGame = (data?.currentUsers ?? 0) > 1;

        if (!isHost) return <WaitHost />;
        if (isReadyForGame) return <ReadyToStartGame />;
        return <WaitOtherPlayer />;
    };

    const EndTurnWaitingScreen = () => {
        if (!isPlaying) return;
        if (state.isEndTurn) return <WaitNextTurn />;
        if (state.isDone) return <WaitEndTurn />;
        return;
    };

    return (
        <Grid container>
            <Grid item md={3.5} />
            <Grid item md={6} className="mb-2.5 mx-auto">
                {isPlaying && !state.isEndTurn && !state.isDone && (
                    <Typography variant="h4">
                        Let&apos;s draw: <b>{state.target?.nameVi}</b>
                    </Typography>
                )}
            </Grid>
            <Grid item container>
                <Grid item md={3.5} className={styles.playerList}>
                    <RoomPlayers />
                </Grid>
                <Grid item md={6} className="flex flex-col mx-auto">
                    {GameWaitingScreen() ?? (
                        <React.Fragment>
                            {EndTurnWaitingScreen() ?? (
                                <DrawBoard className="max-h-[320px]" />
                            )}
                            {data && (
                                <Grid item md className="mt-2 max-h-[30px]">
                                    <CountdownTimer maxTime={data.timeOut} />
                                </Grid>
                            )}
                        </React.Fragment>
                    )}
                    <MessagePanel />
                </Grid>
            </Grid>
        </Grid>
    );
};

const GameWrapper = () => (
    <GameProvider>
        <Wrapper>
            <Game />
        </Wrapper>
    </GameProvider>
);

export default GameWrapper;
