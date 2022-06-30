import React from "react";
import {Button, Grid, GridProps, Typography} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import {useMutation} from "react-query";
import {useNavigate} from "react-router-dom";

import {fetchRandom} from "../../../api/services/RoomServices";
import {AnimatedLoading} from "../../../components/LoadingScreen";
import {useSocket} from "../../../store/SocketStore";
import {confirmJoinRoomNotify, noRoomNotify} from "../../../utils/Notify";

import UserInfo from "./UserInfo";

const PlayNowPanel = (props: GridProps) => {
    const navigate = useNavigate();
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
                    ({message, roomId, onMiddleGame}) => {
                        if (roomId)
                            return navigate(`/play/${roomId}`, {
                                state: {onMiddleGame},
                            });
                        if (message) return alert(message);
                    }
                );
            },
            onError: async () => await noRoomNotify(),
        });
    };

    return (
        <Grid
            className="w-full grid grid-rows-[1fr_4fr_1fr] items-center"
            {...props}
        >
            <Typography variant="h2" className="uppercase text-center">
                Play now
            </Typography>
            <UserInfo />
            <div className="w-full flex justify-center">
                <Button
                    startIcon={<MeetingRoomIcon />}
                    variant="contained"
                    onClick={() => navigate("/room")}
                >
                    Find Room
                </Button>
                <div className="mx-2" />
                <Button
                    startIcon={<SportsEsportsIcon />}
                    variant="contained"
                    onClick={playGame}
                >
                    Play Now
                </Button>
            </div>
            {isFinding && <AnimatedLoading size={100} text="Finding" />}
        </Grid>
    );
};

export default PlayNowPanel;
