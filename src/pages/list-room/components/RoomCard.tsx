import React from "react";
import {Grid, GridProps, Typography} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import TimerIcon from "@mui/icons-material/Timer";
import clsx from "clsx";
import styles from "../../../assets/styles/Room.module.scss";
import {IRoomResponse} from "../../../@types/Room";
import RandomAvatar from "../../../components/RandomAvatar";

interface RoomProps extends IRoomResponse {
    selected?: boolean;
}

const RoomCard = (props: RoomProps & GridProps) => {
    const FIRST_COL_SIZE = 6;
    const {
        id,
        name,
        maxUsers,
        currentUsers,
        collectionName,
        timeOut,
        selected,
        ...others
    } = props;

    return (
        <Grid
            item
            container
            direction="column"
            className={clsx(styles.gameRoom, selected && styles.selected)}
            {...others}
        >
            <Grid item container>
                <Grid item md={FIRST_COL_SIZE}>
                    <RandomAvatar value={id} size={45} />
                </Grid>
                <Grid item md={12 - FIRST_COL_SIZE}>
                    <Typography noWrap={true}>{name}</Typography>
                </Grid>
            </Grid>
            <Grid item container>
                <Grid item md={FIRST_COL_SIZE}>
                    <Typography className="pl-1">ID</Typography>
                </Grid>
                <Grid item md={12 - FIRST_COL_SIZE}>
                    <Typography className="overflow-hidden">#{id}</Typography>
                </Grid>
            </Grid>
            <Grid item container>
                <Grid item md={FIRST_COL_SIZE}>
                    <Typography className="pl-1">Collection</Typography>
                </Grid>
                <Grid item md={12 - FIRST_COL_SIZE}>
                    <Typography className="overflow-hidden" noWrap={true}>
                        {collectionName}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container>
                <Grid item md={FIRST_COL_SIZE}>
                    <PersonIcon color="error" />
                </Grid>
                <Grid item md>
                    <Typography>
                        {currentUsers}/{maxUsers}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container>
                <Grid item md={FIRST_COL_SIZE}>
                    <TimerIcon color="primary" />
                </Grid>
                <Grid item md>
                    <Typography>{timeOut}s</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

const RoomDefault = (): RoomProps => ({
    maxUsers: 20,
    timeOut: 20,
    currentUsers: 10,
    id: Math.random().toString(18).slice(-5),
    eid: Math.random().toString(18).slice(-5),
    name: "fake-room",
    collectionName: "jonh doue",
    selected: false,
});

export default RoomCard;
export {RoomDefault};
export type {RoomProps};
