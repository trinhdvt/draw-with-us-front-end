import React from "react";
import {Avatar, Button, Grid, TextField, Typography} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import avatar from "../../assets/images/avatar.png";
import {makeStyles, styled, withStyles} from "@mui/styles";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
    userControl: {
        margin: "5px 0px 20px 0px !important",
    },
    listItemIcon: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    upperText: {
        textTransform: "uppercase",
    },
});

const CssAvatar = styled(Avatar)({
    width: "100px !important",
    height: "100px !important",
});

const CssTextField = withStyles({
    root: {
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                border: "2px solid gray",
                borderRadius: 12,
            },
            "&.Mui-focused fieldset": {
                borderColor: "purple",
            },
        },
    },
})(TextField);

const UserPanel = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const playGame = () => {
        navigate("/play");
    };

    return (
        <Grid
            item
            container
            className={classes.userControl}
            md={5}
            direction="column"
            alignItems="center"
            rowSpacing={2}
        >
            <Grid item>
                <Typography
                    variant="h2"
                    align="center"
                    className={classes.upperText}
                >
                    Play now
                </Typography>
            </Grid>
            <Grid item>
                <CssAvatar src={avatar} alt="avatar" />
            </Grid>
            <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                sx={{paddingBottom: "6px"}}
            >
                <Grid item className={classes.listItemIcon}>
                    <PersonPinIcon color="error" sx={{paddingRight: "5px"}} />
                    <CssTextField
                        id="outlined-size-small"
                        size="small"
                        label="Nickname"
                        required
                    />
                </Grid>
            </Grid>
            <Grid item container justifyContent="space-evenly">
                <Button
                    startIcon={<MeetingRoomIcon />}
                    variant="contained"
                    onClick={() => {
                        navigate("/room");
                    }}
                >
                    Rooms
                </Button>
                <Button
                    startIcon={<SportsEsportsIcon />}
                    variant="contained"
                    onClick={playGame}
                >
                    Play
                </Button>
            </Grid>
        </Grid>
    );
};

export default UserPanel;
