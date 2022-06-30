import React, {ChangeEvent} from "react";
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
import {useQueryClient} from "react-query";
import {useNavigate} from "react-router-dom";

import ITopic from "../../api/@types/Topic";
import Tag from "../../components/Tag";
import styles from "../../assets/styles/Collection.module.scss";
import {fetchAllTopics} from "../../api/services/TopicServices";
import CssTextField from "../../components/CssTextField";
import RoomLayout from "../../layout/RoomLayout";
import SearchField from "../../components/SearchField";
import TopTooltip from "../../components/TopTooltip";
import {useUser} from "../../store/UserStore";
import {useCreateCollection} from "../../api/services/CollectionServices";
import {ICollectionRequest} from "../../api/@types/Collection";
import useSearch from "../../hooks/useSearch";

import TopicSampleModal from "./components/TopicSampleModal";

const CreateCollection = () => {
    const {user} = useUser();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [topics, setTopics] = React.useState<ITopic[]>([]);
    const [open, setOpen] = React.useState(false);
    const loading = open && topics.length == 0;
    const [collectionName, setCollectionName] = React.useState(user.name);
    const [isPublic, setPublic] = React.useState(true);
    const [currentTopic, setCurrentTopic] = React.useState<ITopic | null>(null);
    const [currentTopicText, setTextCrtTopic] = React.useState("");
    const [addTopics, setAddTopic] = React.useState<ITopic[]>([]);
    const [openPreview, setOpenPreview] = React.useState(false);
    const {mutate} = useCreateCollection();
    const isTopicArrEmpty = addTopics.length == 0;
    const isNotEnoughTopic = addTopics.length < 5;

    React.useEffect(() => {
        if (loading) {
            fetchAllTopics().then(data => setTopics(data));
        }
    }, [loading]);

    const [filtered, debouncedSearch] = useSearch({
        data: addTopics,
        keys: ["nameVi"],
    });

    const onSearch = React.useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            const keyword = e.target.value;
            debouncedSearch(keyword);
        },
        [debouncedSearch]
    );

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
        debouncedSearch("");
    };

    const handleOpenPreview = () => setOpenPreview(true);
    const handleClose = () => setOpenPreview(false);

    const isDisable = isNotEnoughTopic || collectionName.trim() === "";
    const tooltipText = !isDisable
        ? ""
        : isNotEnoughTopic
        ? "Please add at least 5 topic"
        : "Please enter collection name";

    const onCreateCollection = () => {
        const payload: ICollectionRequest = {
            name: collectionName,
            topicIds: addTopics.map(({id}) => id),
            isPublic: isPublic,
        };
        mutate(payload, {
            onSuccess: async () => {
                await queryClient.invalidateQueries("collections");
                navigate("/create");
            },
            onError: err => alert(err.response?.data.message),
        });
    };

    return (
        <RoomLayout title="New Collection">
            <Grid
                className={clsx(
                    styles.subContainer,
                    "w-full grid grid-cols-[1fr_2fr] gap-x-2"
                )}
            >
                <Grid
                    className={clsx(
                        styles.sidePanel,
                        "w-full grid grid-rows-[auto_auto_auto_auto]"
                    )}
                    onKeyDown={e => {
                        if (e.key === "Enter" && currentTopic) {
                            onTopicAdd();
                        }
                    }}
                >
                    <div className="w-full flex flex-col justify-between">
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
                    </div>
                    <div className="w-full grid grid-cols-[auto_1fr] items-center">
                        <Typography className="capitalize">
                            2. Share with others
                        </Typography>
                        <Checkbox
                            className="mr-auto"
                            checked={isPublic}
                            onClick={() => setPublic(!isPublic)}
                        />
                    </div>
                    <div className="w-full grid grid-rows-3  grid-cols-[4fr_1fr] gap-x-2 items-center">
                        <Typography
                            className={clsx(styles.requiredInput, "col-span-2")}
                        >
                            3. Select topic below <span>*</span>
                        </Typography>
                        <Autocomplete
                            className="w-full"
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
                        <Button
                            startIcon={<AddIcon />}
                            variant="contained"
                            disabled={!currentTopic}
                            onClick={onTopicAdd}
                        >
                            Add
                        </Button>
                        <Button
                            className="mr-auto"
                            endIcon={<VisibilityIcon />}
                            size="small"
                            disabled={!currentTopic}
                            onClick={handleOpenPreview}
                        >
                            Preview
                        </Button>
                    </div>
                    <div className="mt-auto mx-auto">
                        <TopTooltip title={tooltipText}>
                            <span>
                                <Button
                                    startIcon={<ConstructionIcon />}
                                    variant="contained"
                                    disabled={isDisable}
                                    onClick={onCreateCollection}
                                >
                                    Create
                                </Button>
                            </span>
                        </TopTooltip>
                    </div>
                </Grid>
                <Grid
                    className={clsx(styles.searchBar, "w-full flex flex-col")}
                >
                    <Grid item className="flex items-center ">
                        <Typography>
                            You have select <b>{addTopics.length}/340</b> topics
                        </Typography>
                        <SearchField
                            className="ml-auto w-[150px]"
                            placeholder="Topic's name"
                            onChange={onSearch}
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
                        {addTopics.length === 0 ? (
                            <Typography>
                                You haven&apos;t select any topics yet
                            </Typography>
                        ) : (
                            (filtered?.length ? filtered : addTopics).map(
                                topic => (
                                    <Tag
                                        label={topic.nameVi}
                                        key={topic.id}
                                        onDelete={() => removeTopic(topic)}
                                    />
                                )
                            )
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
