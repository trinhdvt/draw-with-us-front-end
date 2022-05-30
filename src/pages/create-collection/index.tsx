import React from "react";
import {
    Autocomplete,
    Button,
    CircularProgress,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import MyCheckbox from "../../components/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import ITopic from "../../@types/Topic";
import Tag from "../../components/Tag";
import styles from "../../assets/styles/Collection.module.scss";
import clsx from "clsx";
import {allTopics} from "../../api/services/TopicServices";
import CssTextField from "../../components/CssTextField";
import RoomLayout from "../../layout/RoomLayout";
import SearchField from "../../components/SearchField";

const CreateCollection = () => {
    const [topics, setTopics] = React.useState<ITopic[]>([]);
    const [open, setOpen] = React.useState(false);
    const loading = open && topics.length == 0;
    const [collectionName, setCollectionName] = React.useState("");
    const [isPublic, setPublic] = React.useState(true);
    const [currentTopic, setCurrentTopic] = React.useState<ITopic | null>(null);
    const [addTopics, setAddTopic] = React.useState<ITopic[]>([]);
    const isEmpty = addTopics.length == 0;

    React.useEffect(() => {
        if (loading) {
            allTopics().then(data => setTopics(data));
        }
    }, [loading]);

    const onTopicSelect = (_: React.SyntheticEvent, value: unknown) => {
        setCurrentTopic(value as ITopic);
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

    const removeTopic = (topic: ITopic) => {
        setAddTopic(prev => prev.filter(t => t.id !== topic.id));
        setTopics(prev =>
            [...prev, topic].sort((a, b) => a.nameVi.localeCompare(b.nameVi))
        );
    };

    return (
        <RoomLayout title="Create Collection">
            <Grid container className={styles.subContainer}>
                <Grid
                    item
                    container
                    md={4}
                    direction="column"
                    className={styles.sidePanel}
                >
                    <Grid
                        item
                        container
                        direction="column"
                        className="mb-[10px]"
                    >
                        <Typography className={styles.requiredInput}>
                            1. Collection name <span>*</span>
                        </Typography>
                        <CssTextField
                            variant="outlined"
                            size="small"
                            autoComplete="off"
                            value={collectionName}
                            onChange={e => {
                                setCollectionName(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        container
                        alignItems="center"
                        className="mb-[10px]"
                    >
                        <Typography className="capitalize">
                            2. Share with others
                        </Typography>
                        <MyCheckbox
                            checked={isPublic}
                            onClick={() => setPublic(!isPublic)}
                        />
                    </Grid>
                    <Grid item container direction="column">
                        <Grid item>
                            <Typography className={styles.requiredInput}>
                                3. Select topic below <span>*</span>
                            </Typography>
                        </Grid>

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
                                    getOptionLabel={option => option.nameVi}
                                    sx={{"& input": {maxWidth: "80%"}}}
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
                    <Grid
                        item
                        container
                        justifyContent="center"
                        className="mt-auto"
                    >
                        <Button
                            startIcon={<ConstructionIcon />}
                            variant="contained"
                            disabled={isEmpty || collectionName.trim() == ""}
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
                    className={styles.searchBar}
                >
                    <Grid item container alignItems="center">
                        <Typography>
                            You have select <b>{addTopics.length}/340</b> topics
                        </Typography>
                        <SearchField
                            className="ml-auto w-[150px]"
                            placeholder="Topic name"
                        />
                    </Grid>
                    <Grid
                        item
                        container
                        className={clsx(
                            styles.topicPanel,
                            isEmpty &&
                                "items-center justify-center content-center",
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
                                    label={topic.nameVi}
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
        </RoomLayout>
    );
};

export default CreateCollection;
