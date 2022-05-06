import React from 'react';
import {Button, Grid, MenuItem, Select, Typography} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TimerIcon from '@mui/icons-material/Timer';
import {makeStyles} from "@mui/styles";
import TopicCard, {topicDefault, TopicProps} from "./TopicCard";
import ConstructionIcon from '@mui/icons-material/Construction';

const useStyles = makeStyles({
    roomContainer: {
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "10px",
    },
    roomPanel: {
        backgroundColor: "#9fbdca",
        padding: "10px",
        borderRadius: "10px",
    },
    topicPanel: {
        maxHeight: "230px",
        overflow: "auto",
    },
    settingRow: {
        marginBottom: "10px",
    },
    settingSelect: {
        width: "100%",
        maxHeight: "40px",
        textAlign: "center",
    }
});


const CreateRoom = () => {
    const classes = useStyles();
    const [maxUser, setMaxUser] = React.useState(10);
    const timeOutList = [30, 45, 60, 90, 120];
    const [timeOut, setTimeout] = React.useState(timeOutList[0]);
    const [topicList] = React.useState(() => {
        const sampleProps: TopicProps[] = [];
        for (let i = 0; i < 8; i++) {
            sampleProps.push({...topicDefault, hidden: (i > 4), id: i + ""});
        }
        return sampleProps;
    });
    const [selectedTopic, setSelectedTopic] = React.useState("");

    return (
        <Grid container className={classes.roomPanel}>
            <Grid item container md={4} direction="column"
                  className={classes.roomContainer}
            >
                <Grid item container alignItems="center" className={classes.settingRow}>
                    <Grid item md={2}>
                        <AccountCircleIcon color="primary"/>
                    </Grid>
                    <Grid item md>
                        <Typography>Max User</Typography>
                    </Grid>
                    <Grid item md={4}>
                        <Select
                            value={maxUser}
                            onChange={(e) => setMaxUser(Number(e.target.value))}
                            className={classes.settingSelect}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Grid item container alignItems="center">
                    <Grid item md={2}>
                        <TimerIcon color="primary"/>
                    </Grid>
                    <Grid item md>
                        <Typography>Timeout (sec)</Typography>
                    </Grid>
                    <Grid item md={4}>
                        <Select
                            value={timeOut}
                            onChange={(e) => setTimeout(Number(e.target.value))}
                            className={classes.settingSelect}
                        >
                            {timeOutList.map((time) => {
                                return (<MenuItem value={time} key={time}>
                                    {time}
                                </MenuItem>);
                            })}
                        </Select>
                    </Grid>
                </Grid>
                <Grid item sx={{marginTop: "auto"}} container justifyContent="center">
                    <Button
                        startIcon={<ConstructionIcon/>}
                        variant="contained"
                        disabled={selectedTopic === ""}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
            <Grid item container md direction="column">
                <Grid item className={classes.roomContainer}
                      sx={{marginLeft: "15px"}}
                >
                    <Typography>Select any topic below or <b>Sign in</b> to create your own topic</Typography>
                </Grid>
                <Grid item container justifyContent="space-evenly"
                      sx={{marginTop: "10px"}} className={classes.topicPanel}
                >
                    {topicList.map((p, idx) => {
                        return (
                            <TopicCard {...p} key={idx}
                                       selected={selectedTopic === p.id}
                                       onClick={() => {
                                           setSelectedTopic(selectedTopic === p.id ? "" : p.id)
                                       }}
                            />
                        )
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CreateRoom;
