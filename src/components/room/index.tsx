import React from "react";
import {Box, Button, Grid, TextField} from "@mui/material";
import RoomCard, {roomDefault, RoomProps} from "./RoomCard";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate} from "react-router-dom";
import styles from "../../assets/styles/Room.module.scss";
import RoomLayout from "../../layout/RoomLayout";

const SearchField = React.memo(() => {
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
    const [roomProps] = React.useState(() => {
        const sampleProps: RoomProps[] = [];
        for (let i = 0; i < 8; i++) {
            sampleProps.push({
                ...roomDefault,
                hidden: i > 4,
                roomId: Math.random().toString(36).slice(2, 7),
            });
        }
        return sampleProps;
    });

    return (
        <RoomLayout title="Room List" headerChildren={<SearchField />}>
            <Grid
                item
                container
                justifyContent="space-evenly"
                className={styles.mainPanel}
            >
                {roomProps.map((p, k) => (
                    <RoomCard
                        {...p}
                        key={k}
                        selected={p.roomId == selectedRoom}
                        onClick={() =>
                            setSelectedRoom(
                                selectedRoom != p.roomId ? p.roomId : ""
                            )
                        }
                    />
                ))}
            </Grid>
            <Grid item container justifyContent="center" className="mt-[10px]">
                <Grid item container md={5} justifyContent="space-evenly">
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
                    >
                        Play
                    </Button>
                </Grid>
            </Grid>
        </RoomLayout>
    );
};

export default RoomPage;
