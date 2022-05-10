import React from "react";
import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import MyCheckbox from "../../custom/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import {allTopic} from "../../utils/TopicData";
import Topic from "../../models/Topic";
import SearchIcon from "@mui/icons-material/Search";
import Tag from "../../custom/Tag";

const styles = {
    selectCss: {
        width: "100%",
        maxHeight: "40px",
        textAlign: "center",
    },
    topicPanel: {
        height: "270px",
        overflow: "auto",
        marginTop: "10px",
        backgroundColor: "#9fbdca",
        borderRadius: "10px",
        border: "1px #5d8899 solid",
        padding: "3px",
    },
    roomPanel: {
        backgroundColor: "#9fbdca",
        padding: "10px",
        borderRadius: "10px",
        height: "350px",
    },
    container: {
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "10px",
    },
    "mb-5": {
        marginBottom: "5px",
    },
    "mb-10": {
        marginBottom: "15px",
    },
};

const Collection = () => {
    const [topics, setTopics] = React.useState<Topic[]>([]);
    const [open, setOpen] = React.useState(false);
    const loading = open && topics.length == 0;
    const [topicName, setTopicName] = React.useState("");
    const [isPublic, setPublic] = React.useState(true);
    const [currentTopic, setCurrentTopic] = React.useState<Topic | null>(null);
    const [addTopics, setAddTopic] = React.useState<Topic[]>([]);
    const isEmpty = addTopics.length == 0;
    const disabled = isEmpty || topicName.trim() == "";

    React.useEffect(() => {
        if (loading) {
            setTopics(allTopic());
        }
    }, [loading]);

    const onTopicSelect = (_: React.SyntheticEvent, value: any) => {
        setCurrentTopic(value as Topic);
    };

    const onTopicAdd = () => {
        setAddTopic(prev => {
            if (!currentTopic) return prev;

            setTopics(prevTopics =>
                prevTopics.filter(topic => topic.id !== currentTopic.id)
            );
            setCurrentTopic(null);
            return [...prev, currentTopic];
        });
    };

    const removeTopic = (topic: Topic) => {
        setAddTopic(prev => prev.filter(t => t.id !== topic.id));
        setTopics(prev => [...prev, topic]);
    };

    return (
        <Grid container sx={styles["roomPanel"]}>
            <Grid
                item
                container
                md={4}
                direction="column"
                sx={styles["container"]}
            >
                <Grid item container direction="column" sx={styles["mb-10"]}>
                    <Typography sx={styles["mb-5"]}>1. Topic name</Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        value={topicName}
                        onChange={e => {
                            setTopicName(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item container alignItems="center" sx={styles["mb-10"]}>
                    <Typography>2. Share with others</Typography>
                    <MyCheckbox
                        checked={isPublic}
                        onClick={() => setPublic(!isPublic)}
                    />
                </Grid>
                <Grid item container>
                    <Typography sx={styles["mb-10"]}>
                        3. Select topic below
                    </Typography>
                    <Grid item container>
                        <Grid
                            item
                            container
                            md
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item md={8}>
                                <Autocomplete
                                    open={open}
                                    value={null}
                                    onOpen={() => setOpen(true)}
                                    onClose={() => setOpen(false)}
                                    onChange={onTopicSelect}
                                    options={topics}
                                    loading={loading}
                                    isOptionEqualToValue={(option, value) =>
                                        option.id == value.id
                                    }
                                    getOptionLabel={option => option.name}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            size="small"
                                            label="Topic"
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {loading ? (
                                                            <CircularProgress
                                                                color="inherit"
                                                                size={20}
                                                            />
                                                        ) : null}
                                                        {
                                                            params.InputProps
                                                                .endAdornment
                                                        }
                                                    </React.Fragment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={3.5}>
                                <Button
                                    startIcon={<AddIcon />}
                                    variant="contained"
                                    sx={{width: "90%"}}
                                    disabled={!currentTopic}
                                    onClick={onTopicAdd}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    sx={{marginTop: "auto"}}
                    container
                    justifyContent="center"
                >
                    <Button
                        startIcon={<ConstructionIcon />}
                        variant="contained"
                        disabled={disabled}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
            <Grid
                item
                container
                direction="column"
                sx={{...styles["container"], marginLeft: "auto"}}
                md={7.9}
            >
                <Grid item container alignItems="center">
                    <Typography>
                        You have select {addTopics.length}/340 topics
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            marginLeft: "auto",
                        }}
                    >
                        <SearchIcon
                            sx={{color: "action.active", mr: 1, my: 0.5}}
                        />
                        <TextField
                            size="small"
                            variant="standard"
                            placeholder="topic"
                        />
                    </Box>
                </Grid>
                <Grid
                    item
                    container
                    sx={{
                        ...styles["topicPanel"],
                        alignItems: isEmpty ? "center" : "flex-start",
                        justifyContent: isEmpty ? "center" : "flex-start",
                        alignContent: isEmpty ? "center" : "flex-start",
                    }}
                >
                    {isEmpty ? (
                        <Typography>
                            You haven't select any topics yet
                        </Typography>
                    ) : (
                        addTopics.map((topic, index) => (
                            <Tag
                                label={topic.name}
                                key={index}
                                onDelete={() => {
                                    removeTopic(topic);
                                }}
                            />
                        ))
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Collection;
