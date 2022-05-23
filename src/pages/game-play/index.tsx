import React from "react";
import {Grid, Typography} from "@mui/material";
import randomTarget from "../../utils/RandomTarget";
import RoomPlayers from "./components/RoomPlayers";
import styles from "../../assets/styles/Game.module.scss";
import DrawBoard from "./components/DrawBoard";
import CountdownTimer, {TimerRef} from "./components/CountdownTimer";
import {timeUp} from "./utils/GameNotify";

const Game = () => {
    const [target] = React.useState(() => randomTarget());
    const MAX_TIME = 15;
    const timerRef = React.useRef<TimerRef>(null);

    const onPredict = async (image?: string) => {
        console.log(image);
        timerRef.current?.stopCountdown();
    };

    React.useEffect(() => {
        // timerRef.current?.startCountdown();
    }, []);

    return (
        <Grid container>
            <Grid item container justifyContent="center" className="mb-[10px]">
                <Typography variant="h4">
                    Let&apos;s draw: <b>{target["vi"]}</b>
                </Typography>
            </Grid>
            <Grid item md={3.5} className={styles.playerList}>
                <RoomPlayers />
            </Grid>
            <Grid item container md={8} direction="column" className="ml-auto">
                <DrawBoard
                    predictCallback={onPredict}
                    className="max-h-[320px]"
                />
                <Grid item width="340px">
                    <CountdownTimer
                        ref={timerRef}
                        maxTime={MAX_TIME}
                        onDone={timeUp}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Game;
