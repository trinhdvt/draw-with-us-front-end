import React from "react";
import {Avatar, Grid, GridProps, Typography} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import clsx from "clsx";
import styles from "./styles/Room.module.scss";

interface RoomProps {
    hidden?: boolean;
    roomId: string;
    roomTopic: string;
    roomOwner: string;
    roomAvatar: string;
    currentPlayers: number;
    maxPlayers: number;
    selected?: boolean;
}

const RoomCard = (props: RoomProps & GridProps) => {
    const FIRST_COL_SIZE = 5;

    return (
        <Grid
            item
            container
            direction="column"
            className={clsx(
                styles.gameRoom,
                props.selected && styles.selected,
                props.hidden && "invisible"
            )}
            md={2.5}
            onClick={props.onClick}
        >
            <Grid item container>
                <Grid item md={FIRST_COL_SIZE}>
                    <Avatar src={props.roomAvatar} alt="avatar" />
                </Grid>
                <Grid item md>
                    <Typography>{props.roomOwner}</Typography>
                </Grid>
            </Grid>
            <Grid item container>
                <Grid item md={FIRST_COL_SIZE}>
                    <Typography>Topic</Typography>
                </Grid>
                <Grid item md>
                    <Typography>{props.roomTopic}</Typography>
                </Grid>
            </Grid>
            <Grid item container>
                <Grid item md={FIRST_COL_SIZE}>
                    <Typography>RoomID</Typography>
                </Grid>
                <Grid item md>
                    <Typography>{props.roomId}</Typography>
                </Grid>
            </Grid>
            <Grid item container>
                <Grid item md={FIRST_COL_SIZE}>
                    <PersonIcon />
                </Grid>
                <Grid item md>
                    <Typography>
                        {props.currentPlayers}/{props.maxPlayers}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};
const roomDefault: RoomProps = {
    hidden: false,
    selected: false,
    roomId: "1pxzs",
    roomTopic: "John Doe",
    roomOwner: "Trinh DVT",
    roomAvatar: "https://cdn.trinhdvt.tech/avatar.png",
    currentPlayers: 5,
    maxPlayers: 10,
};

export default RoomCard;
export {roomDefault};
export type {RoomProps};