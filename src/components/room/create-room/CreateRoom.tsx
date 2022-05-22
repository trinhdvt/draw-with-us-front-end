import React from "react";
import {Button, Grid, MenuItem, Select, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TimerIcon from "@mui/icons-material/Timer";
import ConstructionIcon from "@mui/icons-material/Construction";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";
import styles from "../../../assets/styles/Room.module.scss";
import {allCollections} from "../../../api/services/CollectionServices";
import {Collection, CollectionType} from "../../../@types/Collection";
import CollectionCard from "./CollectionCard";
import {useUser} from "../../../context/UserContext";
import RoomServices from "../../../api/services/RoomServices";
import RoomLayout from "../../../layout/RoomLayout";
import {Action, NewRoomReducer} from "./RoomReducer";

interface CollectionState {
    origin: Collection[];
    filtered: Collection[];
}

const CreateRoom = () => {
    const maxUserList = [10, 15, 30, 50];
    const timeOutList = [30, 45, 60, 90, 120];

    const navigate = useNavigate();
    const {user} = useUser();
    const [state, dispatch] = React.useReducer(NewRoomReducer, {
        maxUsers: maxUserList[0],
        timeOut: timeOutList[0],
        collectionId: "",
        sid: user.sid,
    });
    const [filterState, setFilterState] = React.useState<CollectionState>({
        origin: [],
        filtered: [],
    });
    const [filterType, setFilter] = React.useState(CollectionType.ALL);
    const [, startTransition] = React.useTransition();

    const {filtered, origin} = filterState;

    React.useEffect(() => {
        allCollections().then(data => {
            setFilterState({
                origin: data,
                filtered: data,
            });
        });
    }, []);

    React.useEffect(() => {
        let filterRs: Collection[];
        switch (filterType) {
            case CollectionType.ALL:
                filterRs = origin;
                break;

            default:
                filterRs = origin.filter(c => c.type == filterType);
        }

        startTransition(() => {
            setFilterState(prev => ({
                ...prev,
                filtered: filterRs,
            }));
        });
    }, [filterType, origin]);

    const isLogin = true;
    const onCreateRoom = async () => {
        const data = await RoomServices.create(state);
        console.log(data);
    };

    return (
        <RoomLayout title="Create Room">
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
                        alignItems="center"
                        className="mb-[10px]"
                    >
                        <Grid item md={2}>
                            <AccountCircleIcon color="primary" />
                        </Grid>
                        <Grid item md>
                            <Typography>Max User</Typography>
                        </Grid>
                        <Grid item md={4}>
                            <Select
                                value={state.maxUsers}
                                className={styles.selectBox}
                                onChange={e =>
                                    dispatch({
                                        type: Action.SET_MAX_USER,
                                        payload: e.target.value,
                                    })
                                }
                            >
                                {maxUserList.map(m => (
                                    <MenuItem key={m} value={m}>
                                        {m}
                                    </MenuItem>
                                ))}
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
                                value={state.timeOut}
                                className={styles.selectBox}
                                onChange={e =>
                                    dispatch({
                                        type: Action.SET_TIME_OUT,
                                        payload: e.target.value,
                                    })
                                }
                            >
                                {timeOutList.map(time => (
                                    <MenuItem value={time} key={time}>
                                        {time}
                                    </MenuItem>
                                ))}
                            </Select>
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
                            disabled={state.collectionId === ""}
                            onClick={onCreateRoom}
                        >
                            Create
                        </Button>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    md={7.8}
                    direction="column"
                    className="ml-auto"
                >
                    <Grid
                        item
                        container={isLogin}
                        alignItems="center"
                        className={styles.collectionOption}
                    >
                        {!isLogin ? (
                            <Typography>
                                Select any topic collection or <b>Sign in</b> to
                                create your own.
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
                                                    e.target
                                                        .value as CollectionType
                                                )
                                            }
                                        >
                                            <MenuItem
                                                value={CollectionType.ALL}
                                            >
                                                All
                                            </MenuItem>
                                            <MenuItem
                                                value={CollectionType.YOUR}
                                            >
                                                Your topic
                                            </MenuItem>
                                            <MenuItem
                                                value={CollectionType.PUBLIC}
                                            >
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
                                            onClick={() =>
                                                navigate("/collection")
                                            }
                                        >
                                            Create
                                        </Button>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </Grid>
                    <Grid item container className={styles.collectionPanel}>
                        {filtered.map((p, idx) => (
                            <CollectionCard
                                {...p}
                                key={idx}
                                md={2.75}
                                selected={state.collectionId === p.id}
                                onClick={() => {
                                    dispatch({
                                        type: Action.SET_COLLECTION,
                                        payload:
                                            state.collectionId == p.id
                                                ? ""
                                                : p.id,
                                    });
                                }}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </RoomLayout>
    );
};

export default CreateRoom;
