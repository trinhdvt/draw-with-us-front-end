import React from 'react';
import {Avatar, Grid, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import sampleImg from "../../assets/images/avatar.png";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    gameRoom: {
        border: "5px solid #fff",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "25px",
        backgroundColor: "#fff",
        "&:hover": {
            borderColor: "rgba(0,121,255,.7)"
        }
    },
});

interface RoomProps {
    hidden?: boolean;
    roomId: string;
    roomTopic: string;
    roomOwner: string;
    roomAvatar: string;
    currentPlayers: number;
    maxPlayers: number;
}

const Room = (props: RoomProps) => {
    const FIRST_COL_SIZE = 5;
    const classes = useStyles();

    return (
        <Grid item container
              direction="column" className={classes.gameRoom}
              md={2.5}
              sx={{visibility: props.hidden ? "hidden" : "visible"}}
        >
            <Grid item container>
                <Grid item md={FIRST_COL_SIZE}>
                    <Avatar src={props.roomAvatar} alt="avatar"/>
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
                    <PersonIcon/>
                </Grid>
                <Grid item md>
                    <Typography>{props.currentPlayers}/{props.maxPlayers}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};
const roomDefault: RoomProps = {
    hidden: false,
    roomId: "1pxzs",
    roomTopic: "John Doe",
    roomOwner: "Trinh DVT",
    roomAvatar: sampleImg,
    currentPlayers: 5,
    maxPlayers: 10
};

export default Room;
export {roomDefault};
export type {RoomProps};
