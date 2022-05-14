import React from "react";
import {ReactSketchCanvas, ReactSketchCanvasRef} from "react-sketch-canvas";
import {
    Button,
    Divider,
    FormControlLabel,
    Grid,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import UndoIcon from "@mui/icons-material/Undo";
import randomTarget from "../../utils/RandomTarget";
import notify from "../../utils/Notify";
import ListUser from "../user/ListUser";
import LinearProgressWithLabel from "./CountdownTimer";
import {PredictAPI} from "../../api/HttpClient";

const canvasStyle = {
    border: "0.0625rem solid #9c9c9c",
    borderRadius: "0.25rem",
    margin: "auto",
};

type PredictResult = {
    id: string;
    prob: number;
};

const DrawBoard = () => {
    const drawTarget = randomTarget();
    const [isLoading, setIsLoading] = React.useState(false);
    const [eraseMode, setEraseMode] = React.useState(false);
    const [target, setTarget] = React.useState(drawTarget);
    const canvasRef = React.createRef<ReactSketchCanvasRef>();
    const [timeout, setTimeout] = React.useState(0);
    const MAX_TIME = 15; // seconds
    const defaultTimer = {
        remainPercent: 100,
        displayValue: MAX_TIME,
    };
    const [progress, setProgress] = React.useState(defaultTimer);
    const [timerId, setTimer] = React.useState<number>();

    const checkResults = (predicted: PredictResult[]) => {
        const threshold = 15;
        const filtered = predicted.filter(
            r => Math.ceil(r.prob as number) >= threshold
        );
        const isTrue = filtered.map(r => r.id).indexOf(target["en"]) != -1;
        if (isTrue) {
            clearInterval(timerId);
            notify({
                title: "Yay!",
                text: "You got it right!",
            });
        } else {
            notify({
                title: "Oops!",
                text: "You got it wrong!",
                icon: "warning",
                timer: 1000,
            });
        }
    };
    const predict = async () => {
        try {
            setIsLoading(true);

            const response = await PredictAPI.post("/predict/v1", {
                data: await canvasRef.current?.exportImage("png"),
            });

            const data = response.data;
            console.log(data);

            const rawRows: PredictResult[] = [];
            for (const dataKey in data) {
                rawRows.push({
                    id: dataKey,
                    prob: Math.ceil(data[dataKey] * 100),
                });
            }
            checkResults(rawRows);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };
    const clearCanvas = () => {
        canvasRef.current?.clearCanvas();
        canvasRef.current?.resetCanvas();
    };
    const toggleEraseMode = () => {
        canvasRef.current?.eraseMode(!eraseMode);
        setEraseMode(!eraseMode);
    };
    const undo = () => {
        canvasRef.current?.undo();
    };
    const resetGame = () => {
        clearInterval(timerId);
        clearCanvas();
        setTimeout(0);
        setProgress(defaultTimer);

        beginGame();
    };

    React.useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            let remaining = Math.ceil((timeout - now) / 1000);
            if (remaining <= 0) {
                clearInterval(timer);
                if (timeout == 0) return;
                notify({
                    title: "Time's up!",
                    text: "You have no more time to draw!",
                    icon: "error",
                });
            }

            remaining = Math.max(0, remaining);
            setProgress({
                remainPercent: (remaining / MAX_TIME) * 100,
                displayValue: remaining,
            });
        }, 1000);
        setTimer(Number(timer));
        return () => clearInterval(timer);
    }, [timeout]);

    const beginGame = () => {
        setTarget(drawTarget);

        notify({
            title: "Drawing time!",
            html: `You have <b>${MAX_TIME} seconds</b> to draw <b>${drawTarget["en"]}</b>!`,
            icon: "info",
            timer: 3000,
        }).then(() => {
            setTimeout(new Date().getTime() + MAX_TIME * 1000);
        });
    };

    React.useEffect(() => {
        notify({
            title: "Welcome!",
            text: "Draw an image about the word below to get the points!",
            icon: "info",
            timer: undefined,
            showConfirmButton: true,
        }).then(() => {
            beginGame();
        });
    }, []);

    return (
        <Grid container justifyContent="center" direction="row">
            <Grid item md={3}>
                <ListUser />
            </Grid>
            <Grid
                item
                container
                md={5}
                direction="column"
                className="mx-[30px]"
            >
                <Grid
                    item
                    container
                    justifyContent="center"
                    alignItems="flex-end"
                >
                    <Typography variant="h4" className="pr-[5px]">
                        Let's draw:{" "}
                    </Typography>
                    <Typography variant="h3">{target["vi"]}</Typography>
                </Grid>
                <Grid item md={5}>
                    <ReactSketchCanvas
                        ref={canvasRef}
                        style={canvasStyle}
                        height="300px"
                        width="100%"
                        strokeColor="black"
                        strokeWidth={2}
                        eraserWidth={5}
                    />
                </Grid>
                <Grid item md className="mt-[20px]">
                    <LinearProgressWithLabel
                        value={progress.remainPercent}
                        displayvalue={progress.displayValue}
                    />
                </Grid>
            </Grid>

            <Grid item container md={2} className="mx-[30px]">
                <Stack
                    direction="column"
                    spacing={2}
                    divider={<Divider orientation="horizontal" flexItem />}
                    justifyContent="flex-start"
                    alignItems="center"
                    className="pt-[50px]"
                >
                    <LoadingButton
                        onClick={predict}
                        loading={isLoading}
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        loadingPosition="end"
                    >
                        Check it!
                    </LoadingButton>
                    <Button
                        onClick={clearCanvas}
                        variant="outlined"
                        color="error"
                        endIcon={<HighlightOffIcon color="error" />}
                    >
                        Clear
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={undo}
                        endIcon={<UndoIcon color="primary" />}
                    >
                        Undo
                    </Button>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={eraseMode}
                                onClick={toggleEraseMode}
                            />
                        }
                        label={eraseMode ? "Eraser" : "Pen"}
                        labelPlacement="end"
                    />
                    <Button
                        variant="outlined"
                        onClick={resetGame}
                        color="warning"
                        endIcon={<RestartAltIcon />}
                    >
                        Reset
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default DrawBoard;
