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
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import UndoIcon from "@mui/icons-material/Undo";

interface DrawBoardProps {
    onPredict: (image?: string) => void;
}

const DrawBoard = (props: DrawBoardProps & GridProps) => {
    const {onPredict, ...others} = props;
    const canvasRef = React.createRef<ReactSketchCanvasRef>();
    const [eraseMode, setEraseMode] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);

    return (
        <Grid container item md {...others}>
            <Grid item md={7.2}>
                <ReactSketchCanvas
                    ref={canvasRef}
                    height="300px"
                    width="300px"
                    strokeColor="black"
                    strokeWidth={2}
                    eraserWidth={5}
                    className={styles.drawCanvas}
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
                        loading={isLoading}
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        loadingPosition="end"
                        onClick={async () => {
                            setLoading(true);
                            const imageData =
                                await canvasRef.current?.exportImage("png");
                            onPredict(imageData);
                            setLoading(false);
                        }}
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
                        onClick={() => {
                            canvasRef.current?.undo();
                        }}
                        endIcon={<UndoIcon color="primary" />}
                    >
                        Undo
                    </Button>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={eraseMode}
                                onClick={() => setEraseMode(!eraseMode)}
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
