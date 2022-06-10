import React from "react";
import {Button, Grid, InputAdornment, Typography} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {useNavigate} from "react-router-dom";
import CssTextField from "../../../components/CssTextField";
import {useUser} from "../../../context/UserContext";
import {useSocket} from "../../../context/SocketContext";
import RandomAvatar from "../../../components/RandomAvatar";
import {confirmJoinRoomNotify, noRoomNotify} from "../../../utils/Notify";
import {CircularProgress} from "@mui/material";
import {fetchRandom} from "../../../api/services/RoomServices";
import {useMutation} from "react-query";

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

                socket?.emit("room:join", roomEId, ({message, roomId}) => {
                    if (roomId) return navigate(`/play/${roomId}`);
                    if (message) return alert(message);
                });
            },
            onError: async () => await noRoomNotify(),
        });
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
                    size={100}
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
            {isFinding && (
                <div className="flex flex-col justify-center items-center top-0 left-0 w-full h-full z-50 absolute bg-white opacity-75 ">
                    <CircularProgress
                        size={100}
                        thickness={1}
                        className="mb-10"
                    />
                    <Typography variant="h3" className="animate-bounce">
                        Finding ...
                    </Typography>
                </div>
            )}
        </Grid>
    );
};

export default UserPanel;
