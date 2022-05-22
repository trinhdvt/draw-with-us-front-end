import React from "react";
import {Grid, GridProps, Typography} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import TimerIcon from "@mui/icons-material/Timer";
import clsx from "clsx";
import styles from "../../assets/styles/Room.module.scss";
import {RoomResponse} from "../../@types/Room";
import RandomAvatar from "../commons/RandomAvatar";

interface RoomProps extends RoomResponse {
    selected?: boolean;
}

const RoomCard = (props: RoomProps & GridProps) => {
    const FIRST_COL_SIZE = 5;
    const {
        currentUsers,
        maxUsers,
        host,
        id,
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
                    <RandomAvatar value={host.id} size={45} />
                </Grid>
                <Grid item md>
                    <Typography>{host?.name}</Typography>
                </Grid>
            </Grid>
            <Grid item container>
                <Grid item md={FIRST_COL_SIZE}>
                    <Typography className="pl-1">ID</Typography>
                </Grid>
                <Grid item md={12 - FIRST_COL_SIZE}>
                    <Typography className="overflow-hidden">
                        #{id.slice(-5)}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container>
                <Grid item md={FIRST_COL_SIZE}>
                    <Typography className="pl-1">Topic</Typography>
                </Grid>
                <Grid item md={12 - FIRST_COL_SIZE}>
                    <Typography className="overflow-hidden">
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

const RoomDefault = () => ({
    maxUsers: 20,
    timeOut: 20,
    currentUsers: 10,
    id: Math.random().toString(18),
    host: {
        name: "trinhdvt",
        id: "123456",
        sid: "12345678",
        avatar: "https://cdn.trinhdvt.tech/avatar.png",
    },
    collectionName: "jonh doue",
    selected: false,
});

export default RoomCard;
export {RoomDefault};
export type {RoomProps};
