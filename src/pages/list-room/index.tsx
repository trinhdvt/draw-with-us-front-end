import React from "react";
import {Button, Grid} from "@mui/material";
import RoomCard, {RoomDefault} from "./components/RoomCard";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import {useNavigate} from "react-router-dom";
import styles from "../../assets/styles/Room.module.scss";
import RoomLayout from "../../layout/RoomLayout";
import {useRooms} from "../../api/services/RoomServices";
import SearchField from "../../components/SearchField";
import {useSocket} from "../../context/SocketContext";
import TopTooltip from "../../components/TopTooltip";

const RoomHome = () => {
    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = React.useState("");
    const [defaultRooms] = React.useState(() => {
        return Array.from({length: 6}, () => RoomDefault());
    });
    const socket = useSocket();
    const {data} = useRooms();

    const onRoomSelect = (roomId: string) => {
        setSelectedRoom(roomId != selectedRoom ? roomId : "");
    };

    const onJoinRoom = async () => {
        socket?.emit("room:join", selectedRoom, ({message, roomId}) => {
            if (roomId) return navigate(`/play/${roomId}`);
            if (message) alert(message);
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
        >
            <Grid item container className={styles.mainPanel}>
                {[...(data ?? []), ...defaultRooms].map(room => (
                    <RoomCard
                        md={2.85}
                        {...room}
                        key={room.eid}
                        selected={room.eid == selectedRoom}
                        onClick={() => onRoomSelect(room.eid)}
                    />
                ))}
            </Grid>
            <Grid item container justifyContent="center" className="mt-[10px]">
                <Grid item container md={4.5} justifyContent="space-evenly">
                    <Button
                        startIcon={<MeetingRoomIcon />}
                        variant="contained"
                        onClick={() => {
                            navigate("/create");
                        }}
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
            </Grid>
        </RoomLayout>
    );
};

export default RoomHome;
