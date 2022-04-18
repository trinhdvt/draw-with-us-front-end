import React from 'react';
import {ReactSketchCanvas, ReactSketchCanvasRef} from "react-sketch-canvas";
import {Button, Divider, FormControlLabel, Grid, Stack, Switch} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ResultTable, {Row} from "./PredictResultTable";
import UndoIcon from '@mui/icons-material/Undo';
import API from "../../api";

const styles = {
    border: '0.0625rem solid #9c9c9c',
    borderRadius: '0.25rem',
    margin: 'auto'
};
const parentStyles = {
    margin: '0px 30px',
};

const DrawBoard = () => {
    const [result, setResult] = React.useState<Row[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [eraseMode, setEraseMode] = React.useState(false);
    const canvasRef = React.createRef<ReactSketchCanvasRef>();

    const predict = async () => {
        try {
            setIsLoading(true);
            setResult([]);

            const response = await API.post("/predict/v1", {
                data: (await canvasRef.current?.exportImage("png"))
            });

            const data = response.data;
            const rs: Row[] = [];
            for (const dataKey in data) {
                rs.push({
                    id: dataKey,
                    prob: `${(data[dataKey] * 100).toFixed(2)}%`
                });
            }
            setResult(rs);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }
    const clearCanvas = () => {
        canvasRef.current?.clearCanvas();
        canvasRef.current?.resetCanvas();
        setResult([]);
    };
    const toggleEraseMode = () => {
        canvasRef.current?.eraseMode(!eraseMode);
        setEraseMode(!eraseMode);
    };
    const undo = () => {
        canvasRef.current?.undo();
    };

    return (
        <Grid container justifyContent="flex-end">
            <Grid item container md={5}
                  sx={parentStyles}
                  direction="column"
            >
                <Grid item md>
                    <ReactSketchCanvas
                        ref={canvasRef}
                        style={styles}
                        height="300px"
                        width="100%"
                        strokeColor="black"
                        strokeWidth={2}
                        eraserWidth={5}
                    />
                </Grid>
                <Grid item md sx={{marginTop: "20px"}}>
                    <ResultTable rows={result} isLoading={isLoading}/>
                </Grid>
            </Grid>

            <Grid item md={2} sx={parentStyles}>
                <Stack
                    direction="column"
                    spacing={2}
                    divider={<Divider orientation="horizontal" flexItem/>}
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <LoadingButton
                        onClick={predict}
                        loading={isLoading}
                        variant="contained"
                        endIcon={<ArrowForwardIcon/>}
                        loadingPosition="end"
                    >
                        Predict
                    </LoadingButton>
                    <Button onClick={clearCanvas} variant="outlined" color="error"
                            endIcon={<HighlightOffIcon color="error"/>}
                    >
                        Clear
                    </Button>
                    <Button variant="outlined" onClick={undo}
                            endIcon={<UndoIcon color="primary"/>}
                    >
                        Undo
                    </Button>
                    <FormControlLabel
                        control={<Switch checked={eraseMode} onClick={toggleEraseMode}/>}
                        label={eraseMode ? "Eraser" : "Pen"}
                        labelPlacement="end"
                    />
                </Stack>
            </Grid>
        </Grid>
    );
};

export default DrawBoard;
