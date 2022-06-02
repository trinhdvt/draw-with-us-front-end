import React from "react";
import {Grid, GridProps, Typography} from "@mui/material";
import clsx from "clsx";
import styles from "../../../assets/styles/Room.module.scss";
import {IRoomResponse} from "../../../@types/Room";
import RandomAvatar from "../../../components/RandomAvatar";
import {IoHourglassOutline} from "react-icons/io5";
import {FaRegUser} from "react-icons/fa";

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
        onClick,
        ...others
    } = props;

    const isFull = maxUsers === currentUsers;

    return (
        <Grid
            item
            container
            direction="column"
            className={clsx(
                styles.gameRoom,
                selected && styles.selected,
                isFull && "hover:cursor-not-allowed"
            )}
            onClick={isFull ? undefined : onClick}
            {...others}
        >
            <Grid item container>
                <Grid item md={FIRST_COL_SIZE}>
                    <RandomAvatar value={id} size={45} />
                </Grid>
                <Grid item md={12 - FIRST_COL_SIZE}>
                    <Typography className="break-all">{name}</Typography>
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
                    <FaRegUser
                        className={clsx(
                            "primary-icon",
                            isFull && "text-red-500"
                        )}
                    />
                </Grid>
                <Grid item md>
                    <Typography>
                        {currentUsers}/{maxUsers}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container>
                <Grid item md={FIRST_COL_SIZE}>
                    <IoHourglassOutline className="primary-icon" />
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
