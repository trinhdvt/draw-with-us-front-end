import React from "react";
import {Box, Button, Divider, Grid, Stack, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Sample from "./Sample";
import styles from "../../assets/styles/Gallery.module.scss";
import clsx from "clsx";

const Gallery = () => {
    const SAMPLE_SIZE = 3;
    const topics = ["flower", "john doe", "faker faker faker"];
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
                <Grid item className="bg-white mb-[10px]">
                    <Box className="flex items-end">
                        <SearchIcon
                            sx={{color: "action.active", mr: 1, my: 0.5}}
                        />
                        <TextField variant="standard" />
                    </Box>
                </Grid>
                <Grid item className="bg-white">
                    <Stack
                        divider={<Divider orientation="horizontal" flexItem />}
                    >
                        {topics.map((topic, index) => (
                            <Button
                                key={index}
                                className={clsx(
                                    selectedId == index && styles.selected
                                )}
                                onClick={() => setSelectId(index)}
                            >
                                {topic}
                            </Button>
                        ))}
                    </Stack>
                </Grid>
            </Grid>
            <Grid
                item
                container
                justifyContent="space-evenly"
                md={9}
                spacing={2}
                className={styles.samplePanel}
            >
                {sampleData.map((_, i) => (
                    <Grid item md={SAMPLE_SIZE} key={i}>
                        <Sample />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default Gallery;
