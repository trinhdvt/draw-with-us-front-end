import React from "react";
import {Button, Grid, MenuItem, Select, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TimerIcon from "@mui/icons-material/Timer";
import ConstructionIcon from "@mui/icons-material/Construction";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";
import styles from "./styles/Room.module.scss";
import clsx from "clsx";
import {allCollections} from "../../services/CollectionServices";
import {CollectionProps, CollectionType} from "../../models/Collection";
import CollectionCard from "./CollectionCard";

const CreateRoom = () => {
    const navigate = useNavigate();

    const [maxUser, setMaxUser] = React.useState(10);
    const timeOutList = [30, 45, 60, 90, 120];

    const [filterType, setFilter] = React.useState(CollectionType.ALL);
    const [timeOut, setTimeout] = React.useState(timeOutList[0]);
    const [collection, setCollection] = React.useState<CollectionProps[]>([]);

    React.useEffect(() => {
        allCollections().then(data => setCollection(data));
    }, []);

    const [crtCollection, setCrtCollection] = React.useState("");
    const isLogin = true;

    return (
        <Grid container className={styles.subPanel}>
            <Grid
                item
                container
                md={4}
                direction="column"
                className={styles.container}
            >
                <Grid item container alignItems="center" className="mb-[10px]">
                    <Grid item md={2}>
                        <AccountCircleIcon color="primary" />
                    </Grid>
                    <Grid item md>
                        <Typography>Max User</Typography>
                    </Grid>
                    <Grid item md={4}>
                        <Select
                            value={maxUser}
                            className={styles.selectBox}
                            onChange={e => setMaxUser(Number(e.target.value))}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Grid item container alignItems="center">
                    <Grid item md={2}>
                        <TimerIcon color="primary" />
                    </Grid>
                    <Grid item md>
                        <Typography>Timeout (sec)</Typography>
                    </Grid>
                    <Grid item md={4}>
                        <Select
                            value={timeOut}
                            className={styles.selectBox}
                            onChange={e => setTimeout(Number(e.target.value))}
                        >
                            {timeOutList.map(time => {
                                return (
                                    <MenuItem value={time} key={time}>
                                        {time}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </Grid>
                </Grid>
                <Grid
                    item
                    className="mt-auto"
                    container
                    justifyContent="center"
                >
                    <Button
                        startIcon={<ConstructionIcon />}
                        variant="contained"
                        disabled={crtCollection === ""}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
            <Grid item container md direction="column">
                <Grid
                    item
                    container={isLogin}
                    className={clsx(styles.container, "ml-[15px] w-[95%]")}
                    alignItems="center"
                >
                    {!isLogin ? (
                        <Typography>
                            Select any topic below or <b>Sign in</b> to create
                            your own topic
                        </Typography>
                    ) : (
                        <>
                            <Grid item md={5}>
                                <Typography>Select one topic</Typography>
                            </Grid>
                            <Grid
                                item
                                container
                                md
                                justifyContent="space-evenly"
                            >
                                <Grid item md={5}>
                                    <Select
                                        className={styles.selectBox}
                                        value={filterType}
                                        onChange={e =>
                                            setFilter(
                                                e.target.value as CollectionType
                                            )
                                        }
                                    >
                                        <MenuItem value={CollectionType.ALL}>
                                            All
                                        </MenuItem>
                                        <MenuItem value={CollectionType.YOUR}>
                                            Your topic
                                        </MenuItem>
                                        <MenuItem value={CollectionType.PUBLIC}>
                                            Public
                                        </MenuItem>
                                        <MenuItem
                                            value={CollectionType.OFFICIAL}
                                        >
                                            Official
                                        </MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item>
                                    <Button
                                        startIcon={<AddIcon />}
                                        variant="contained"
                                        onClick={() => navigate("/collection")}
                                    >
                                        Create
                                    </Button>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Grid>
                <Grid
                    item
                    container
                    justifyContent="space-evenly"
                    className={styles.collectionPanel}
                >
                    {collection.map((p, idx) => (
                        <CollectionCard
                            {...p}
                            key={idx}
                            selected={crtCollection === p.id}
                            onClick={() => {
                                setCrtCollection(
                                    crtCollection === p.id ? "" : p.id
                                );
                            }}
                        />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CreateRoom;
