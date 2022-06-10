import React from "react";
import {Grid, Typography} from "@mui/material";
import RoomPlayers from "./components/RoomPlayers";
import styles from "../../assets/styles/Game.module.scss";
import DrawBoard from "./components/DrawBoard";
import CountdownTimer from "./components/CountdownTimer";
import {RoomStatus} from "../../@types/Room";
import {
    WaitingForGameStart,
    WaitingHost,
    WaitingOthersPlayers,
} from "./components/WaitingScreen";
import {useRoom} from "../../api/services/RoomServices";
import AppLayout from "../../layout/AppLayout";
import {useSocket} from "../../context/SocketContext";
import ITopic from "../../@types/Topic";
import GameProvider, {GameActionType, useGame} from "./context/GameContext";
import {timeUp} from "./utils/GameNotify";

const Game = () => {
    const socket = useSocket();
    const {state, dispatch} = useGame();
    const {data} = useRoom(state.roomId);

    React.useEffect(() => {
        socket?.on("game:nextTurn", (topic: ITopic) => {
            dispatch({type: GameActionType.NEXT, payload: topic});
        });

        socket?.on("game:endTurn", async () => {
            if (!state.isDone) {
                await timeUp();
            }
        });
        return () => {
            socket?.off("game:nextTurn");
            socket?.off("game:endTurn");
        };
    }, [state.isDone, socket, dispatch]);

    const isPlaying = data?.status == RoomStatus.PLAYING;
    const WaitingScreen = () => {
        if (isPlaying) return;
        const isHost = data?.isHost;
        const isReadyForGame = (data?.currentUsers ?? 0) > 1;

        if (!isHost) return <WaitingHost />;

        if (isReadyForGame) return <WaitingForGameStart />;

        return <WaitingOthersPlayers />;
    };

    return (
        <Grid container>
            <Grid item container justifyContent="center" className="mb-[10px]">
                {isPlaying && (
                    <Typography variant="h4">
                        Let&apos;s draw: <b>{state.target?.nameVi}</b>
                    </Typography>
                )}
            </Grid>
            <Grid item md={3.5} className={styles.playerList}>
                <RoomPlayers />
            </Grid>
            <Grid item container md={8} direction="column" className="ml-auto">
                {WaitingScreen() ?? (
                    <>
                        <DrawBoard className="max-h-[320px]" />
                        {data && (
                            <Grid item width="340px">
                                <CountdownTimer maxTime={data.timeOut} />
                            </Grid>
                        )}
                    </>
                )}
            </Grid>
        </Grid>
    );
};

const GameWrapper = () => (
    <GameProvider>
        <AppLayout>
            <Game />
        </AppLayout>
    </GameProvider>
);

export default GameWrapper;
