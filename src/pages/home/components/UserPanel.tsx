import React from "react";
import {Avatar, Button, Grid, InputAdornment, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import {useMutation} from "react-query";
import {useNavigate} from "react-router-dom";

import {fetchRandom} from "../../../api/services/RoomServices";
import CssTextField from "../../../components/CssTextField";
import {AnimatedLoading} from "../../../components/LoadingScreen";
import {useSocket} from "../../../store/SocketStore";
import {useUser} from "../../../store/UserStore";
import {confirmJoinRoomNotify, noRoomNotify} from "../../../utils/Notify";

const UserPanel = () => {
    const navigate = useNavigate();
    const {user, setUser} = useUser();
    const socket = useSocket();
    const [isFinding, setFinding] = React.useState(false);

    const useRandomRoom = useMutation(fetchRandom, {
        onMutate: () => setFinding(true),
        onSettled: () => setFinding(false),
    });

    const playGame = () => {
        useRandomRoom.mutate(undefined, {
            onSuccess: async ({roomEId}) => {
                const {isConfirmed} = await confirmJoinRoomNotify();
                if (!isConfirmed) return;

                socket?.emit(
                    "room:join",
                    {eid: roomEId},
                    ({message, roomId}) => {
                        if (roomId) return navigate(`/play/${roomId}`);
                        if (message) return alert(message);
                    }
                );
            },
            onError: async () => await noRoomNotify(),
        });
    };

    return (
        <Grid
            item
            container
            md={5}
            rowSpacing={2}
            className="flex-col items-center mt-1 mb-5"
        >
            <Grid item>
                <Typography variant="h2" align="center" className="uppercase">
                    Play now
                </Typography>
            </Grid>
            <Grid item>
                <Avatar src={user.avatar} className="w-[100px] h-[100px]" />
            </Grid>
            <Grid item className="mb-1.5">
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
            <Grid item container justifyContent="space-evenly">
                <Button
                    startIcon={<MeetingRoomIcon />}
                    variant="contained"
                    onClick={() => navigate("/room")}
                >
                    Find Room
                </Button>
                <Button
                    startIcon={<SportsEsportsIcon />}
                    variant="contained"
                    onClick={playGame}
                >
                    Play Now
                </Button>
            </Grid>
            {isFinding && <AnimatedLoading size={100} text="Finding" />}
        </Grid>
    );
};

export default UserPanel;
