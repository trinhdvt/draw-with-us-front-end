import React from 'react';
import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import Room, {roomDefault, RoomProps} from "./Room";
import {makeStyles} from "@mui/styles";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
    roomContainer: {
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "10px",
    },
    roomPanel: {
        backgroundColor: "#9fbdca",
        paddingTop: "25px",
        maxHeight: "350px",
        overflow: "auto",
        borderRadius: "10px",
    },
    roomControl: {
        marginTop: "10px"
    },
    header: {
        marginBottom: "10px"
    },
    backBtn: {
        borderRadius: "5px",
        border: "2px solid #9fbdca",
    }
});

const RoomPage = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = React.useState("");
    const [roomProps] = React.useState(() => {
        const sampleProps: RoomProps[] = [];
        for (let i = 0; i < 8; i++) {
            sampleProps.push({...roomDefault, hidden: (i > 4), roomId: Math.random().toString(36).slice(2, 7)});
        }
        return sampleProps;
    });

    return (
        <Grid container className={classes.roomContainer}>
            <Grid item container alignItems="center" className={classes.header}>
                <Grid item md={1.3}>
                    <Button startIcon={<ArrowBackIcon/>}
                            className={classes.backBtn}
                            onClick={() => {
                                navigate("/")
                            }}
                    >
                        Back
                    </Button>
                </Grid>
                <Grid item md={1.7}>
                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <SearchIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                        <TextField id="input-with-sx" variant="standard"/>
                    </Box>
                </Grid>
                <Grid item md container justifyContent="center">
                    <Typography variant="h3">Room list</Typography>
                </Grid>
                <Grid item md={3}>

                </Grid>
            </Grid>
            <Grid item container justifyContent="space-evenly" className={classes.roomPanel}
            >
                {roomProps.map((p, k) =>
                    <Room {...p} key={k}
                          selected={p.roomId == selectedRoom}
                          onClick={() => setSelectedRoom(selectedRoom != p.roomId ? p.roomId : "")}
                    />)
                }
            </Grid>
            <Grid item container justifyContent="center" className={classes.roomControl}>
                <Grid item container md={5} justifyContent="space-evenly">
                    <Button
                        startIcon={<MeetingRoomIcon/>}
                        variant="contained"
                        onClick={() => {
                            navigate("/create");
                        }}
                    >
                        New Room
                    </Button>
                    <Button
                        startIcon={<SportsEsportsIcon/>}
                        variant="contained"
                        disabled={selectedRoom == ""}
                    >
                        Play
                    </Button>
                </Grid>

            </Grid>
        </Grid>
    );
};

export default RoomPage;
