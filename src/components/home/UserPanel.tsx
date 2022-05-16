import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Jdenticon from "react-jdenticon";
import {Button, Grid, Typography} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import {useNavigate} from "react-router-dom";
import CssTextField from "../commons/CssTextField";
import {useUser} from "../../context/UserContext";
import StyledAvatar from "../commons/StyledAvatar";
import {useSocket} from "../../context/SocketContext";

const UserPanel = () => {
    const navigate = useNavigate();
    const {user, setUser} = useUser();
    const socket = useSocket();

    const playGame = () => {
        navigate(`/play`);
    };

    return (
        <Grid
            item
            container
            className="mt-[5px] mb-[20px]"
            md={5}
            direction="column"
            alignItems="center"
            rowSpacing={2}
        >
            <Grid item>
                <Typography variant="h2" align="center" className="uppercase">
                    Play now
                </Typography>
            </Grid>
            <Grid item>
                <StyledAvatar className="w-[100px] h-[100px] bg-white">
                    <Jdenticon size="100" value={user.sid} />
                </StyledAvatar>
            </Grid>
            <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                sx={{paddingBottom: "6px"}}
            >
                <Grid
                    item
                    container
                    alignItems="center"
                    justifyContent="center"
                >
                    <PersonPinIcon color="error" className="pr-[5px]" />
                    <CssTextField
                        size="small"
                        label="Nickname"
                        value={user.name}
                        onChange={e => setUser({...user, name: e.target.value})}
                        onBlur={() => socket?.emit("user:update", user)}
                        required
                    />
                </Grid>
            </Grid>
            <Grid item container justifyContent="space-evenly">
                <Button
                    startIcon={<MeetingRoomIcon />}
                    variant="contained"
                    onClick={() => {
                        navigate("/room");
                    }}
                >
                    Rooms
                </Button>
                <Button
                    startIcon={<SportsEsportsIcon />}
                    variant="contained"
                    onClick={playGame}
                >
                    Play
                </Button>
            </Grid>
        </Grid>
    );
};

export default UserPanel;
