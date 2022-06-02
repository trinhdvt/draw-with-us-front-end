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
    const {state} = useGame();

    React.useEffect(() => {
        if (timeOut == -1) return;

        const timer = setInterval(() => {
            const now = new Date().getTime();
            let remaining = Math.ceil((timeOut - now) / 1e3);
            if (remaining <= 0) {
                setProgress(defaultProgress);
                clearInterval(timer);
            }

            remaining = Math.max(0, remaining);
            setProgress({
                remainPercent: (remaining / maxTime) * 100,
                remainingTime: remaining,
            });
        }, 1e3);

        return () => clearInterval(timer);
    }, [defaultProgress, maxTime, timeOut]);

    React.useEffect(() => {
        if (state.target) {
            setProgress(defaultProgress);
            setTimeOut(new Date().getTime() + maxTime * 1e3);
        }
    }, [defaultProgress, maxTime, state.target]);

    return (
        <div className="flex items-center">
            <div className="w-full mr-1">
                <LinearProgress
                    variant="determinate"
                    value={progress.remainPercent}
                    className="h-[10px] rounded-[5px]"
                    color="info"
                    {...others}
                />
            </div>
            <div className="min-w-[35px]">
                <Typography variant="body2" className="font-medium">
                    {`${progress.remainingTime} S`}
                </Typography>
            </div>
        </div>
    );
};

export default React.memo(Timer);
export type {TimerProps};
