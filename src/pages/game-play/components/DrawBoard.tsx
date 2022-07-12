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
import {useTranslation} from "react-i18next";

import styles from "../../../assets/styles/Game.module.scss";
import LoadingButton from "../../../components/LoadingButton";
import {GameActionType, useGame} from "../context/GameContext";
import {useSocket} from "../../../store/SocketStore";
import {alertSuccess, alertWrong} from "../utils/GameNotify";

const DrawBoard = ({...others}: GridProps) => {
    const {t} = useTranslation();
    const socket = useSocket();
    const {gameState, dispatch} = useGame();
    const {roomId} = gameState;
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
        dispatch({type: GameActionType.DONE, payload: true});
        alertSuccess().then(() => {
            clearCanvas();
        });
    };

    const clearCanvas = () => {
        canvasRef.current?.clearCanvas();
        canvasRef.current?.resetCanvas();
    };

    return (
        <Grid container item md xs {...others}>
            <Grid item md={8.5} xs={8.5}>
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
                className="items-center ml-auto my-auto"
            >
                <LoadingButton
                    isLoading={isPredicting}
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    onClick={onPredict}
                    disabled={gameState.isDone}
                    size="small"
                    fullWidth
                >
                    {t("game_play.draw_board.check")}
                </LoadingButton>
                <Button
                    variant="outlined"
                    onClick={() => canvasRef.current?.undo()}
                    endIcon={<UndoIcon color="primary" />}
                    size="small"
                    fullWidth
                >
                    {t("game_play.draw_board.undo")}
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
                    label={
                        eraseMode
                            ? t("game_play.draw_board.eraser")
                            : t("game_play.draw_board.pencil")
                    }
                    labelPlacement="end"
                />
                <Button
                    onClick={clearCanvas}
                    variant="outlined"
                    color="error"
                    size="small"
                    fullWidth
                    endIcon={<HighlightOffIcon color="error" />}
                >
                    {t("game_play.draw_board.clear")}
                </Button>
            </Stack>
        </Grid>
    );
};

export default DrawBoard;
