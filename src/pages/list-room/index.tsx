import React from "react";
import {Button, Grid, MenuItem, Select} from "@mui/material";
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

import RoomCard, {RoomDefault} from "./components/RoomCard";

enum ShowMode {
    ROOM_NAME,
    COLLECTION_NAME,
}

const RoomHome = () => {
    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = React.useState("");
    const [defaultRooms] = React.useState(() => {
        return Array.from({length: 6}, () => RoomDefault());
    });
    const socket = useSocket();
    const {data} = useRooms();
    const queryClient = useQueryClient();
    const [showMode, setShowMode] = React.useState(ShowMode.ROOM_NAME);

    React.useEffect(() => {
        socket?.on("list-room:update", async () => {
            await queryClient.invalidateQueries(["rooms"]);
        });
        return () => {
            socket?.off("list-room:update");
        };
    }, [queryClient, socket]);

    // eslint-disable-next-line react/display-name
    const ModeSelector = React.memo(() => (
        <Select
            size="small"
            value={showMode}
            onChange={e => setShowMode(e.target.value as ShowMode)}
        >
            <MenuItem value={ShowMode.ROOM_NAME}>Room&apos;s name</MenuItem>
            <MenuItem value={ShowMode.COLLECTION_NAME}>
                Collection&apos;s name
            </MenuItem>
        </Select>
    ));

    const onRoomSelect = (roomId: string) => setSelectedRoom(roomId);
    const onJoinRoom = async () => {
        socket?.emit("room:join", selectedRoom, ({message, roomId}) => {
            if (roomId) return navigate(`/play/${roomId}`);
            if (message) {
                queryClient
                    .invalidateQueries(["rooms"])
                    .then(() => alert(message));
            }
        });
    };
    const isDisable = selectedRoom === "";
    const tooltipText = isDisable ? "Please select a room" : "Join now";

    return (
        <RoomLayout
            title="Room List"
            headerChildren={
                <SearchField className="w-[130px]" placeholder="Room's ID" />
            }
            endChildren={<ModeSelector />}
        >
            <Grid item container className={styles.mainPanel}>
                {[...(data ?? []), ...defaultRooms].map(room => (
                    <RoomCard
                        md={2.85}
                        {...room}
                        showMode={showMode}
                        key={room.eid}
                        selected={room.eid == selectedRoom}
                        onClick={() => onRoomSelect(room.eid)}
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
export {ShowMode};
