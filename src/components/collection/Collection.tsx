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
import Topic from "../../models/Topic";
import SearchIcon from "@mui/icons-material/Search";
import Tag from "../../custom/Tag";
import styles from "./Collection.module.scss";
import clsx from "clsx";
import {allTopics} from "../../services/TopicServices";

const Collection = () => {
    const [topics, setTopics] = React.useState<Topic[]>([]);
    const [open, setOpen] = React.useState(false);
    const loading = open && topics.length == 0;
    const [topicName, setTopicName] = React.useState("");
    const [isPublic, setPublic] = React.useState(true);
    const [currentTopic, setCurrentTopic] = React.useState<Topic | null>(null);
    const [addTopics, setAddTopic] = React.useState<Topic[]>([]);
    const isEmpty = addTopics.length == 0;

    React.useEffect(() => {
        if (loading) {
            allTopics().then(data => setTopics(data));
        }
    }, [loading]);

    const onTopicSelect = (_: React.SyntheticEvent, value: unknown) => {
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
        setTopics(prev =>
            [...prev, topic].sort((a, b) => a.name.localeCompare(b.name))
        );
    };

    return (
        <Grid container className={styles.settingPanel}>
            <Grid
                item
                container
                md={4}
                direction="column"
                className={styles.container}
            >
                <Grid item container direction="column" className="mb-[10px]">
                    <Typography className="mb-[5px]">1. Topic name</Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        value={topicName}
                        onChange={e => {
                            setTopicName(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item container alignItems="center" className="mb-[10px]">
                    <Typography>2. Share with others</Typography>
                    <MyCheckbox
                        checked={isPublic}
                        onClick={() => setPublic(!isPublic)}
                    />
                </Grid>
                <Grid item container>
                    <Typography className="mb-[10px]">
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
                                    className="w-[90%]"
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
                    container
                    justifyContent="center"
                    className="mt-auto"
                >
                    <Button
                        startIcon={<ConstructionIcon />}
                        variant="contained"
                        disabled={isEmpty || topicName.trim() == ""}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
            <Grid
                item
                container
                direction="column"
                md={7.9}
                className={clsx(styles.container, "ml-auto")}
            >
                <Grid item container alignItems="center">
                    <Typography>
                        You have select {addTopics.length}/340 topics
                    </Typography>
                    <Box className="flex items-end ml-auto">
                        <SearchIcon
                            sx={{color: "action.active", mr: 1, my: 0.5}}
                        />
                        <TextField
                            size="small"
                            variant="standard"
                            placeholder="Topic"
                        />
                    </Box>
                </Grid>
                <Grid
                    item
                    container
                    className={clsx(
                        styles.topicPanel,
                        isEmpty && "items-center justify-center content-center",
                        !isEmpty && "content-start"
                    )}
                >
                    {isEmpty ? (
                        <Typography>
                            You haven&apos;t select any topics yet
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
