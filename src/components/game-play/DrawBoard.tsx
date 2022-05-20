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
import styles from "../../assets/styles/Game.module.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import UndoIcon from "@mui/icons-material/Undo";
import clsx from "clsx";
import LoadingButton from "../commons/LoadingButton";

interface DrawBoardProps {
    predictCallback: (image?: string) => Promise<void>;
}

const DrawBoard = (props: DrawBoardProps & GridProps) => {
    const {predictCallback, ...others} = props;
    const canvasRef = React.useRef<ReactSketchCanvasRef>(null);
    const [eraseMode, setEraseMode] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);

    const onPrediction = async () => {
        setLoading(true);
        const imageData = await canvasRef.current?.exportImage("png");
        await predictCallback(imageData);
        setLoading(false);
    };

    return (
        <Grid container item md {...others}>
            <Grid item md={7.2}>
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
            <Grid item md={2}>
                <Stack
                    direction="column"
                    spacing={3}
                    divider={<Divider orientation="horizontal" flexItem />}
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <LoadingButton
                        isLoading={isLoading}
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        onClick={onPrediction}
                    >
                        Check
                    </LoadingButton>
                    <Button
                        onClick={() => {
                            canvasRef.current?.clearCanvas();
                            canvasRef.current?.resetCanvas();
                        }}
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
                        label={eraseMode ? "Eraser" : "Pen"}
                        labelPlacement="end"
                    />
                </Stack>
            </Grid>
        </Grid>
    );
};

export default DrawBoard;
