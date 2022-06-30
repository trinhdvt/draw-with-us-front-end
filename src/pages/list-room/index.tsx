import React from "react";
import {Button} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "react-query";
import clsx from "clsx";

import styles from "../../assets/styles/Room.module.scss";
import RoomLayout from "../../layout/RoomLayout";
import {useRooms} from "../../api/services/RoomServices";
import SearchField from "../../components/SearchField";
import {useSocket} from "../../store/SocketStore";
import TopTooltip from "../../components/TopTooltip";

import RoomCard, {RoomDefault, RoomProps} from "./components/RoomCard";
import ShowModeSelector from "./components/ShowModeSelector";
import useJoinRoom from "./hooks/useJoinRoom";

const RoomHome = () => {
    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = React.useState<RoomProps>();
    const [defaultRooms] = React.useState(() => {
        return Array.from({length: 6}, () => RoomDefault());
    });
    const socket = useSocket();
    const {data} = useRooms();
    const queryClient = useQueryClient();
    const {joinRoom} = useJoinRoom();

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
        const {isPrivate, eid} = selectedRoom;
        await joinRoom({eid, isPrivate: !!isPrivate});
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
            <div
                className={clsx(
                    styles.mainPanel,
                    "w-full max-w-full grid grid-cols-4 gap-2 px-2 scrollBar"
                )}
            >
                {[...(data ?? []), ...defaultRooms].map(room => (
                    <RoomCard
                        {...room}
                        key={room.eid}
                        selected={room.eid == selectedRoom?.eid}
                        onClick={() => onRoomSelect(room)}
                    />
                ))}
            </div>
            <div className="w-full flex justify-center mt-2 px-2">
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
            </div>
        </RoomLayout>
    );
};

export default RoomHome;
