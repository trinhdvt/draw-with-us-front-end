import React from "react";
import {Grid, Typography} from "@mui/material";
import RoomPlayers from "./components/RoomPlayers";
import styles from "../../assets/styles/Game.module.scss";
import DrawBoard from "./components/DrawBoard";
import CountdownTimer from "./components/CountdownTimer";
import {useParams} from "react-router-dom";
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

const Game = () => {
    const {roomId} = useParams();
    const {data} = useRoom(roomId);
    const socket = useSocket();
    const {state, dispatch} = useGame();

    React.useEffect(() => {
        socket?.on("game:nextTurn", (topic: ITopic) => {
            dispatch({type: GameActionType.NEXT, payload: topic});
        });

        socket?.on("game:endTurn", () => {
            if (state.isDone) console.log("game:endTurn", "Done");
            else console.log("game:endTurn", "Not-yet");
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
        <AppLayout>
            <Grid container>
                <Grid
                    item
                    container
                    justifyContent="center"
                    className="mb-[10px]"
                >
                    {isPlaying && (
                        <Typography variant="h4">
                            Let&apos;s draw: <b>{state.target?.nameVi}</b>
                        </Typography>
                    )}
                </Grid>
                <Grid item md={3.5} className={styles.playerList}>
                    <RoomPlayers />
                </Grid>
                <Grid
                    item
                    container
                    md={8}
                    direction="column"
                    className="ml-auto"
                >
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
        </AppLayout>
    );
};

const GameWrapper = () => (
    <GameProvider>
        <Game />
    </GameProvider>
);

export default GameWrapper;
