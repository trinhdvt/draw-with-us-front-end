import React from "react";
import {
    Autocomplete,
    Button,
    Checkbox,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import AddIcon from "@mui/icons-material/Add";
import clsx from "clsx";
import VisibilityIcon from "@mui/icons-material/Visibility";

import ITopic from "../../api/@types/Topic";
import Tag from "../../components/Tag";
import styles from "../../assets/styles/Collection.module.scss";
import {fetchAllTopics} from "../../api/services/TopicServices";
import CssTextField from "../../components/CssTextField";
import RoomLayout from "../../layout/RoomLayout";
import SearchField from "../../components/SearchField";
import TopTooltip from "../../components/TopTooltip";
import {useUser} from "../../context/UserStore";

import TopicSampleModal from "./components/TopicSampleModal";

const CreateCollection = () => {
    const {user} = useUser();
    const [topics, setTopics] = React.useState<ITopic[]>([]);
    const [open, setOpen] = React.useState(false);
    const loading = open && topics.length == 0;
    const [collectionName, setCollectionName] = React.useState(user.name);
    const [isPublic, setPublic] = React.useState(true);
    const [currentTopic, setCurrentTopic] = React.useState<ITopic | null>(null);
    const [currentTopicText, setTextCrtTopic] = React.useState("");
    const [addTopics, setAddTopic] = React.useState<ITopic[]>([]);
    const [openPreview, setOpenPreview] = React.useState(false);
    const isTopicArrEmpty = addTopics.length == 0;

    React.useEffect(() => {
        if (loading) {
            fetchAllTopics().then(data => setTopics(data));
        }
    }, [loading]);

    const onTopicSelect = (_: React.SyntheticEvent, value_: unknown) => {
        const value = value_ as ITopic;
        setCurrentTopic(value);
        setTextCrtTopic(value.nameVi);
    };

    const onTopicAdd = () => {
        setAddTopic(prev => {
            if (!currentTopic) return prev;
            setTopics(prevTopics =>
                prevTopics.filter(topic => topic.id !== currentTopic.id)
            );
            return [...prev, currentTopic];
        });
        setCurrentTopic(null);
        setTextCrtTopic("");
    };

    const removeTopic = (topic: ITopic) => {
        setAddTopic(prev => prev.filter(t => t.id !== topic.id));
        setTopics(prev =>
            [...prev, topic].sort((a, b) => a.nameVi.localeCompare(b.nameVi))
        );
    };

    const handleOpenPreview = () => setOpenPreview(true);
    const handleClose = () => setOpenPreview(false);

    const isDisable = isTopicArrEmpty || collectionName.trim() === "";
    const tooltipText = !isDisable
        ? ""
        : isTopicArrEmpty
        ? "Please add at least one topic"
        : "Please enter collection name";

    return (
        <RoomLayout title="Create Collection">
            <Grid container className={styles.subContainer}>
                <Grid
                    item
                    md={4}
                    className={clsx(styles.sidePanel, "flex flex-col")}
                >
                    <Grid item className="flex flex-col mb-2.5">
                        <Typography className={styles.requiredInput}>
                            1. Collection name <span>*</span>
                        </Typography>
                        <CssTextField
                            variant="outlined"
                            size="small"
                            autoComplete="off"
                            value={collectionName}
                            onChange={e => setCollectionName(e.target.value)}
                        />
                    </Grid>
                    <Grid item className="flex items-center mb-2.5">
                        <Typography className="capitalize">
                            2. Share with others
                        </Typography>
                        <Checkbox
                            checked={isPublic}
                            onClick={() => setPublic(!isPublic)}
                        />
                    </Grid>
                    <Grid item className="flex flex-col">
                        <Grid item>
                            <Typography className={styles.requiredInput}>
                                3. Select topic below <span>*</span>
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            md
                            className="flex items-center justify-between"
                        >
                            <Grid item md={8}>
                                <Autocomplete
                                    open={open}
                                    value={null}
                                    onOpen={() => setOpen(true)}
                                    onClose={() => setOpen(false)}
                                    inputValue={currentTopicText}
                                    onChange={onTopicSelect}
                                    options={topics}
                                    loading={loading}
                                    isOptionEqualToValue={(option, value) =>
                                        option.id == value.id
                                    }
                                    clearOnBlur={false}
                                    getOptionLabel={option => option.nameVi}
                                    sx={{"& input": {maxWidth: "80%"}}}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            size="small"
                                            label="Topic"
                                            onChange={e =>
                                                setTextCrtTopic(e.target.value)
                                            }
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
                    <Grid item className="mt-1">
                        <Button
                            endIcon={<VisibilityIcon />}
                            size="small"
                            disabled={!currentTopic}
                            onClick={handleOpenPreview}
                        >
                            Preview
                        </Button>
                    </Grid>
                    <Grid item className="mt-auto mx-auto">
                        <TopTooltip title={tooltipText}>
                            <span>
                                <Button
                                    startIcon={<ConstructionIcon />}
                                    variant="contained"
                                    disabled={isDisable}
                                >
                                    Create
                                </Button>
                            </span>
                        </TopTooltip>
                    </Grid>
                </Grid>
                <Grid
                    item
                    md={7.9}
                    className={clsx(styles.searchBar, "flex flex-col")}
                >
                    <Grid item className="flex items-center ">
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
                            isTopicArrEmpty &&
                                "items-center justify-center content-center",
                            !isTopicArrEmpty && "content-start"
                        )}
                    >
                        {isTopicArrEmpty ? (
                            <Typography>
                                You haven&apos;t select any topics yet
                            </Typography>
                        ) : (
                            addTopics.map(topic => (
                                <Tag
                                    label={topic.nameVi}
                                    key={topic.id}
                                    onDelete={() => removeTopic(topic)}
                                />
                            ))
                        )}
                    </Grid>
                </Grid>
            </Grid>
            {openPreview && (
                <TopicSampleModal onClose={handleClose} topic={currentTopic} />
            )}
        </RoomLayout>
    );
};

export default CreateCollection;
