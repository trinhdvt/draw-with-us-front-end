import React from "react";
import {LinearProgress, LinearProgressProps, Typography} from "@mui/material";

interface TimerProps extends LinearProgressProps {
    remainingTime?: number;
    maxTime: number;
    onDone?: () => Promise<unknown>;
}

interface TimerRef {
    startCountdown: () => void;
    stopCountdown: () => void;
}

interface Progress {
    remainingTime: number;
    remainPercent: number;
}

const Timer = React.forwardRef<TimerRef, TimerProps>((props, ref) => {
    const {maxTime, onDone, ...others} = props;
    const defaultProgress = React.useMemo<Progress>(() => {
        return {
            remainPercent: 100,
            remainingTime: maxTime,
        };
    }, [maxTime]);
    const [progress, setProgress] = React.useState<Progress>(defaultProgress);

    const [timeout, setTimeout] = React.useState(0);
    const [timerId, setTimer] = React.useState<number>();

    React.useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            let remaining = Math.ceil((timeout - now) / 1000);
            if (remaining <= 0) {
                clearInterval(timer);
                if (timeout == 0) return;
                onDone?.().then(() => setProgress(defaultProgress));
            }

            remaining = Math.max(0, remaining);
            setProgress({
                remainPercent: (remaining / maxTime) * 100,
                remainingTime: remaining,
            });
        }, 1000);
        setTimer(Number(timer));

        return () => clearInterval(timer);
    }, [defaultProgress, maxTime, onDone, timeout]);

    const startCountdown = () => {
        setTimeout(new Date().getTime() + maxTime * 1000);
    };
    const stopCountdown = () => {
        clearTimeout(timerId);
    };

    React.useImperativeHandle(ref, () => ({
        startCountdown,
        stopCountdown,
    }));

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
                <Typography variant="body2">
                    {`${progress.remainingTime} S`}
                </Typography>
            </div>
        </div>
    );
});
Timer.displayName = "Timer";

export default Timer;
export type {TimerProps, TimerRef};
