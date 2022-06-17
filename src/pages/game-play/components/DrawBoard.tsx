import React from "react";
import {
    Button,
    Divider,
    FormControlLabel,
    Grid,
    GridProps,
    Stack,
    Switch,
} from "@mui/material";
import {ReactSketchCanvas, ReactSketchCanvasRef} from "react-sketch-canvas";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import UndoIcon from "@mui/icons-material/Undo";
import clsx from "clsx";

import styles from "../../../assets/styles/Game.module.scss";
import LoadingButton from "../../../components/LoadingButton";
import {GameActionType, useGame} from "../context/GameContext";
import {useSocket} from "../../../context/SocketContext";
import {alertSuccess, alertWrong} from "../utils/GameNotify";

const DrawBoard = ({...others}: GridProps) => {
    const socket = useSocket();
    const {state, dispatch} = useGame();
    const {roomId} = state;
    const canvasRef = React.useRef<ReactSketchCanvasRef>(null);
    const [eraseMode, setEraseMode] = React.useState(false);
    const [isPredicting, setPredicting] = React.useState(false);

    const onPredict = async () => {
        setPredicting(true);
        const imageData = await canvasRef.current?.exportImage("png");
        if (imageData && roomId) {
            socket?.emit("game:predict", roomId, imageData, response => {
                if (response.isCorrect) {
                    onCorrectDraw();
                } else {
                    alertWrong();
                }
                setPredicting(false);
            });
        }
    };

    const onCorrectDraw = () => {
        alertSuccess().then(() => {
            dispatch({type: GameActionType.DONE, payload: true});
            clearCanvas();
        });
    };

    const clearCanvas = () => {
        canvasRef.current?.clearCanvas();
        canvasRef.current?.resetCanvas();
    };

    return (
        <Grid container item md {...others}>
            <Grid item md={8.5}>
                <ReactSketchCanvas
                    ref={canvasRef}
                    height="300px"
                    width="300px"
                    strokeColor="black"
                    strokeWidth={2}
                    eraserWidth={10}
                    className={clsx(
                        styles.drawCanvas,
                        "hover:cursor-pencil",
                        eraseMode && "hover:cursor-erase"
                    )}
                />
            </Grid>
            <Stack
                spacing={3}
                divider={<Divider orientation="horizontal" flexItem />}
                className="justify-start items-center ml-auto my-auto"
            >
                <LoadingButton
                    isLoading={isPredicting}
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    onClick={onPredict}
                    disabled={state.isDone}
                >
                    Check
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
                    onClick={() => canvasRef.current?.undo()}
                    endIcon={<UndoIcon color="primary" />}
                >
                    Undo
                </Button>
                <FormControlLabel
                    control={
                        <Switch
                            checked={eraseMode}
                            onClick={() => {
                                canvasRef.current?.eraseMode(!eraseMode);
                                setEraseMode(!eraseMode);
                            }}
                        />
                    }
                    label={eraseMode ? "Eraser" : "Pencil"}
                    labelPlacement="end"
                />
            </Stack>
        </Grid>
    );
};

export default DrawBoard;
