import React from "react";
import {Button, Grid} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "react-query";

import styles from "../../assets/styles/Room.module.scss";
import RoomLayout from "../../layout/RoomLayout";
import {useRooms} from "../../api/services/RoomServices";
import SearchField from "../../components/SearchField";
import {useSocket} from "../../store/SocketStore";
import TopTooltip from "../../components/TopTooltip";
import GetPassword from "../../utils/PasswordDialog";
import {notifyError} from "../../utils/Notify";

import RoomCard, {RoomDefault, RoomProps} from "./components/RoomCard";
import ShowModeSelector from "./components/ShowModeSelector";

const RoomHome = () => {
    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = React.useState<RoomProps>();
    const [defaultRooms] = React.useState(() => {
        return Array.from({length: 6}, () => RoomDefault());
    });
    const socket = useSocket();
    const {data} = useRooms();
    const queryClient = useQueryClient();

    React.useEffect(() => {
        socket?.on("list-room:update", async () => {
            await queryClient.invalidateQueries(["rooms"]);
        });
        return () => {
            socket?.off("list-room:update");
        };
    }, [queryClient, socket]);

    const onRoomSelect = (room: RoomProps) => setSelectedRoom(room);

    const onJoinRoom = async () => {
        if (!selectedRoom) return;

        let password: string | undefined;
        const {isPrivate, eid} = selectedRoom;

        if (isPrivate) {
            password = await GetPassword();
            if (!password) return;
        }
        socket?.emit(
            "room:join",
            {eid, password},
            async ({message, roomId, onMiddleGame}) => {
                if (roomId)
                    return navigate(`/play/${roomId}`, {
                        state: {onMiddleGame},
                    });
                if (message) {
                    await queryClient.invalidateQueries(["rooms"]);
                    await notifyError(message as string);
                }
            }
        );
    };
    const isDisable = !selectedRoom;
    const tooltipText = isDisable ? "Please select a room" : "Join now";

    return (
        <RoomLayout
            title="Room List"
            headerChildren={
                <SearchField className="w-[130px]" placeholder="Room's ID" />
            }
            endChildren={<ShowModeSelector />}
        >
            <Grid item container className={styles.mainPanel}>
                {[...(data ?? []), ...defaultRooms].map(room => (
                    <RoomCard
                        md={2.85}
                        {...room}
                        key={room.eid}
                        selected={room.eid == selectedRoom?.eid}
                        onClick={() => onRoomSelect(room)}
                    />
                ))}
            </Grid>
            <Grid item container className="justify-center mt-2.5 px-2">
                <Button
                    className="mr-2"
                    startIcon={<MeetingRoomIcon />}
                    variant="contained"
                    onClick={() => navigate("/create")}
                >
                    New Room
                </Button>
                <TopTooltip title={tooltipText}>
                    <span>
                        <Button
                            startIcon={<SportsEsportsIcon />}
                            variant="contained"
                            disabled={isDisable}
                            className="w-[135px]"
                            onClick={onJoinRoom}
                        >
                            Play
                        </Button>
                    </span>
                </TopTooltip>
            </Grid>
        </RoomLayout>
    );
};

export default RoomHome;
