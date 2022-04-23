import React from 'react';
import {ReactSketchCanvas, ReactSketchCanvasRef} from "react-sketch-canvas";
import {Button, Divider, FormControlLabel, Grid, Stack, Switch, Typography} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ResultTable, {Row} from "./PredictResultTable";
import UndoIcon from '@mui/icons-material/Undo';
import API from "../../api";
import randomTarget from "./RandomTarget";
import notify from "../../utils/Notify";
import ListUser from "../user/ListUser";

const canvasStyle = {
    border: '0.0625rem solid #9c9c9c',
    borderRadius: '0.25rem',
    margin: 'auto'
};

const parentStyles = {
    margin: '0px 30px',
};

const DrawBoard = () => {
    const drawTarget = randomTarget();
    const [result, setResult] = React.useState<Row[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [eraseMode, setEraseMode] = React.useState(false);
    const [target, setTarget] = React.useState(drawTarget);
    const canvasRef = React.createRef<ReactSketchCanvasRef>();
    React.useEffect(() => {
        setTarget(drawTarget);
    }, []);
    const checkResults = (predicted: Row[]) => {
        const threshold = 15;
        const filtered = predicted.filter(r => Math.ceil(r.prob as number) >= threshold);
        const isTrue = filtered.map(r => r.id).indexOf(target['en']) != -1;
        if (isTrue) {
            notify({
                title: "Yay!",
                text: "You got it right!"
            });
        } else {
            notify({
                title: "Oops!",
                text: "You got it wrong!",
                icon: "warning"
            });
        }
    };
    const predict = async () => {
        try {
            setIsLoading(true);
            setResult([]);

            const response = await API.post("/predict/v1", {
                data: (await canvasRef.current?.exportImage("png"))
            });

            const data = response.data;
            console.log(data);

            const rawRows: Row[] = [];
            for (const dataKey in data) {
                rawRows.push({
                    id: dataKey,
                    prob: Math.ceil(data[dataKey] * 100)
                })
            }
            setResult(rawRows.map(r => ({
                id: r.id,
                prob: `${r.prob}%`
            })));
            checkResults(rawRows);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }
    const clearCanvas = async () => {
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
        <Grid container justifyContent="center" direction="row">
            <Grid item md={3}>
                <ListUser/>
            </Grid>
            <Grid item container md={5}
                  sx={parentStyles}
                  direction="column"
            >
                <Grid item container justifyContent="center" alignItems="flex-end">
                    <Typography variant="h4" sx={{paddingRight: "5px"}}>Let's draw: </Typography>
                    <Typography variant="h3">{target['vi']}</Typography>
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
                <Grid item md sx={{marginTop: "20px"}}>
                    <ResultTable rows={result} isLoading={isLoading}/>
                </Grid>
            </Grid>

            <Grid item container md={2} sx={parentStyles}>
                <Stack
                    direction="column"
                    spacing={2}
                    divider={<Divider orientation="horizontal" flexItem/>}
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{paddingTop: "50px"}}
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
