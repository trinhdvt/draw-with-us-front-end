import React from "react";
import {Button, Grid} from "@mui/material";
import RoomCard, {RoomDefault} from "./components/RoomCard";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import {useNavigate} from "react-router-dom";
import styles from "../../assets/styles/Room.module.scss";
import RoomLayout from "../../layout/RoomLayout";
import RoomServices from "../../api/services/RoomServices";
import SearchField from "../../components/SearchField";
import {useSocket} from "../../context/SocketContext";
import {GenericResponse} from "../../@types/SocketReponse";

const RoomHome = () => {
    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = React.useState("");
    const defaultRooms = React.useMemo(() => {
        return Array.from({length: 6}, () => RoomDefault());
    }, []);
    const [rooms, setRooms] = React.useState(defaultRooms);

    const onRoomSelect = (roomId: string) => {
        setSelectedRoom(roomId != selectedRoom ? roomId : "");
    };
    React.useEffect(() => {
        RoomServices.getAll().then(data => {
            setRooms([...data, ...defaultRooms]);
        });
    }, [defaultRooms]);
    const socket = useSocket();
    const onJoinRoom = async () => {
        socket?.emit("room:join", selectedRoom, (response: GenericResponse) => {
            if (response.roomId) {
                const {roomId} = response;
                return navigate(`/play/${roomId}`);
            }
            if (response.message) {
                alert(response.message);
            }
        });
    };

    return (
        <RoomLayout
            title="Room List"
            headerChildren={
                <SearchField className="w-[130px]" placeholder="Room's ID" />
            }
        >
            <Grid item container className={styles.mainPanel}>
                {rooms.map(room => (
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
                    <Button
                        startIcon={<SportsEsportsIcon />}
                        variant="contained"
                        disabled={selectedRoom == ""}
                        className="w-[135px]"
                        onClick={onJoinRoom}
                    >
                        Play
                    </Button>
                </Grid>
            </Grid>
        </RoomLayout>
    );
};

export default RoomHome;