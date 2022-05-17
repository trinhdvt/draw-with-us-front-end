import React from "react";
import {Box, Button, Grid, TextField} from "@mui/material";
import RoomCard, {RoomDefault, RoomProps} from "./RoomCard";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate} from "react-router-dom";
import styles from "../../assets/styles/Room.module.scss";
import RoomLayout from "../../layout/RoomLayout";
import RoomServices from "../../services/RoomServices";

const SearchField = React.memo(() => {
    console.log("SearchField");
    return (
        <Box className="flex items-end w-[110px] ml-4">
            <SearchIcon sx={{color: "action.active", mr: 1, my: 0.5}} />
            <TextField variant="standard" />
        </Box>
    );
});
SearchField.displayName = "SearchField";

const RoomPage = () => {
    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = React.useState("");
    const [rooms, setRooms] = React.useState(() => {
        const sampleProps: RoomProps[] = [];
        for (let i = 0; i < 6; i++) {
            sampleProps.push(RoomDefault());
        }
        return sampleProps;
    });

    const onRoomSelect = (roomId: string) => {
        setSelectedRoom(roomId != selectedRoom ? roomId : "");
    };

    React.useEffect(() => {
        RoomServices.getAll().then(data => {
            setRooms(prev => [...data, ...prev]);
        });
    }, []);

    return (
        <RoomLayout title="Room List" headerChildren={<SearchField />}>
            <Grid item container className={styles.mainPanel}>
                {rooms.map(room => (
                    <RoomCard
                        md={2.85}
                        {...room}
                        key={room.id}
                        selected={room.id == selectedRoom}
                        onClick={() => onRoomSelect(room.id)}
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
                    >
                        Play
                    </Button>
                </Grid>
            </Grid>
        </RoomLayout>
    );
};

export default RoomPage;
