import React from "react";
import {Button, Grid, InputAdornment, Typography} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {useNavigate} from "react-router-dom";
import CssTextField from "../commons/CssTextField";
import {useUser} from "../../context/UserContext";
import {useSocket} from "../../context/SocketContext";
import RandomAvatar from "../commons/RandomAvatar";

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
                <RandomAvatar
                    size="100"
                    value={user.sid}
                    className="w-[100px] h-[100px] bg-white"
                />
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
                    <CssTextField
                        size="small"
                        label="Nickname"
                        value={user.name}
                        onChange={e => setUser({...user, name: e.target.value})}
                        onBlur={() => socket?.emit("user:update", user)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
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
