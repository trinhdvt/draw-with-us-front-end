import React from "react";
import {Grid, Typography} from "@mui/material";
import randomTarget from "../../utils/RandomTarget";
import RoomPlayers from "./components/RoomPlayers";
import styles from "../../assets/styles/Game.module.scss";
import DrawBoard from "./components/DrawBoard";
import CountdownTimer, {TimerRef} from "./components/CountdownTimer";
import {timeUp} from "./utils/GameNotify";
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

const Game = () => {
    const {roomId} = useParams();
    const [target] = React.useState(() => randomTarget());
    const timerRef = React.useRef<TimerRef>(null);
    const socket = useSocket();

    React.useEffect(() => {
        return () => {
            socket?.emit("room:exit", roomId);
        };
    }, [roomId, socket]);

    const {data} = useRoom(roomId);

    const isPlaying = data?.status == RoomStatus.PLAYING;
    const WaitingScreen = () => {
        if (isPlaying) return;

        const isHost = data?.isHost;
        const isReadyForGame = (data?.currentUsers ?? 0) > 1;

        if (!isHost) return <WaitingHost />;

        if (isReadyForGame) return <WaitingForGameStart />;

        return <WaitingOthersPlayers />;
    };

    const onPredict = async (image?: string) => {
        console.log(image);
        timerRef.current?.startCountdown();
        // timerRef.current?.stopCountdown();
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
                            Let&apos;s draw: <b>{target["vi"]}</b>
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
                            <DrawBoard
                                predictCallback={onPredict}
                                className="max-h-[320px]"
                            />
                            {data && (
                                <Grid item width="340px">
                                    <CountdownTimer
                                        ref={timerRef}
                                        maxTime={data.timeOut}
                                        onDone={timeUp}
                                    />
                                </Grid>
                            )}
                        </>
                    )}
                </Grid>
            </Grid>
        </AppLayout>
    );
};

export default Game;
