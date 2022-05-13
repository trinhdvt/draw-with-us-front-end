import React from "react";
import {Avatar, Grid, Typography} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import sampleImg from "../../assets/images/avatar.png";
import clsx from "clsx";
import styles from "./styles/Room.module.scss";

interface RoomProps extends React.HTMLAttributes<HTMLElement> {
    hidden?: boolean;
    roomId: string;
    roomTopic: string;
    roomOwner: string;
    roomAvatar: string;
    currentPlayers: number;
    maxPlayers: number;
    selected?: boolean;
}

const Room = (props: RoomProps) => {
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
    roomAvatar: sampleImg,
    currentPlayers: 5,
    maxPlayers: 10,
};

export default Room;
export {roomDefault};
export type {RoomProps};
