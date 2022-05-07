import React from "react";
import {Box, Button, Divider, Grid, Stack, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {makeStyles} from "@mui/styles";
import Sample from "./Sample";

const useStyles = makeStyles({
    whiteBg: {
        backgroundColor: "#fff",
    },
    marginBtm: {
        marginBottom: "10px",
    },
    topicSample: {
        backgroundColor: "#9fbdca",
        maxHeight: "450px",
        overflow: "auto",
        borderRadius: "10px",
    },
    selected: {
        border: "1px solid black",
    },
});

const Gallery = () => {
    const SAMPLE_SIZE = 3;
    const topics = ["flower", "john doe", "faker faker faker"];
    const classes = useStyles();
    const [selectedId, setSelectId] = React.useState(-1);
    const [sampleData, setSample] = React.useState<number[]>([]);
    React.useEffect(() => {
        if (selectedId != -1) {
            setSample(Array((selectedId + 1) * 4).fill(Math.random()));
        }
    }, [selectedId]);

    return (
        <Grid container justifyContent="space-around">
            <Grid item container md={2} direction="column">
                <Grid
                    item
                    className={[classes.whiteBg, classes.marginBtm].join(" ")}
                >
                    <Box sx={{display: "flex", alignItems: "flex-end"}}>
                        <SearchIcon
                            sx={{color: "action.active", mr: 1, my: 0.5}}
                        />
                        <TextField id="input-with-sx" variant="standard" />
                    </Box>
                </Grid>
                <Grid item className={classes.whiteBg}>
                    <Stack
                        divider={<Divider orientation="horizontal" flexItem />}
                    >
                        {topics.map((topic, index) => {
                            return (
                                <Button
                                    key={index}
                                    onClick={() => setSelectId(index)}
                                    className={
                                        selectedId == index
                                            ? classes.selected
                                            : ""
                                    }
                                >
                                    {topic}
                                </Button>
                            );
                        })}
                    </Stack>
                </Grid>
            </Grid>
            <Grid
                item
                container
                justifyContent="space-evenly"
                className={classes.topicSample}
                md={9}
                spacing={2}
            >
                {sampleData.map((v, i) => (
                    <Grid item md={SAMPLE_SIZE}>
                        <Sample />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default Gallery;
