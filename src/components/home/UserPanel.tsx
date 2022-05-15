import React from "react";
import {Button, Grid, Typography} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import {useNavigate} from "react-router-dom";
import CssTextField from "../commons/CssTextField";
import LargeAvatar from "../commons/LargeAvatar";
import {useUser} from "../../context/UserContext";

const UserPanel = () => {
    const navigate = useNavigate();
    const {user} = useUser();
    const playGame = () => {
        const roomId = "123456";
        navigate(`/play/${roomId}`);
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
                <LargeAvatar src={user.avatar} alt="avatar" />
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
                        id="outlined-size-small"
                        size="small"
                        label="Nickname"
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
