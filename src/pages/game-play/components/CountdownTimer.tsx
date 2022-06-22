import React from "react";
import {LinearProgress, LinearProgressProps, Typography} from "@mui/material";

import {useGame} from "../context/GameContext";

interface TimerProps extends LinearProgressProps {
    maxTime: number;
}

const Timer = (props: TimerProps) => {
    const {maxTime, ...others} = props;
    const defaultProgress = React.useMemo(() => {
        return {
            remainPercent: 100,
            remainingTime: maxTime,
        };
    }, [maxTime]);
    const [progress, setProgress] = React.useState(defaultProgress);
    const [timeOut, setTimeOut] = React.useState(-1);
    const {gameState} = useGame();
    const BREAK_TIME = 3;

    React.useEffect(() => {
        if (timeOut == -1) return;

        const timer = setInterval(() => {
            const now = new Date().getTime();
            let remainingTime = Math.ceil((timeOut - now) / 1e3);
            if (remainingTime <= 0) {
                clearInterval(timer);
            }

            remainingTime = Math.max(0, remainingTime);
            const factor = gameState.isEndTurn ? BREAK_TIME : maxTime;
            const remainPercent = (remainingTime / factor) * 100;
            setProgress({remainPercent, remainingTime});
        }, 1e3);

        return () => clearInterval(timer);
    }, [maxTime, gameState.isEndTurn, timeOut]);

    React.useEffect(() => {
        if (gameState.target) {
            setProgress(defaultProgress);
            setTimeOut(new Date().getTime() + maxTime * 1e3);
        }
    }, [defaultProgress, maxTime, gameState.target]);

    React.useEffect(() => {
        if (gameState.isEndTurn) {
            setProgress({remainPercent: 100, remainingTime: BREAK_TIME});
            setTimeOut(new Date().getTime() + BREAK_TIME * 1e3);
        }
    }, [gameState.isEndTurn]);

    return (
        <div className="flex items-center">
            <div className="flex-1 mr-1">
                <LinearProgress
                    variant="determinate"
                    value={progress.remainPercent}
                    className="h-2.5 rounded-xl"
                    color="warning"
                    {...others}
                />
            </div>
            <div className="max-w-fit">
                <Typography variant="body2" className="font-bold text-lg">
                    {`${progress.remainingTime} S`}
                </Typography>
            </div>
        </div>
    );
};

export default React.memo(Timer);
export type {TimerProps};
