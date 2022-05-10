import React from "react";
import {Button, Grid, MenuItem, Select, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TimerIcon from "@mui/icons-material/Timer";
import TopicCard, {topicDefault, TopicProps} from "./TopicCard";
import ConstructionIcon from "@mui/icons-material/Construction";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";

const styles = {
    settingRow: {
        marginBottom: "10px",
    },
    selectCss: {
        width: "100%",
        maxHeight: "40px",
        textAlign: "center",
    },
    collectionPanel: {
        maxHeight: "230px",
        overflow: "auto",
        marginTop: "10px",
    },
    roomPanel: {
        backgroundColor: "#9fbdca",
        padding: "10px",
        borderRadius: "10px",
    },
    container: {
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "10px",
    },
};

type Collection = "all" | "public" | "official" | "your";

const CreateRoom = () => {
    const navigate = useNavigate();
    const [maxUser, setMaxUser] = React.useState(10);
    const [collection, setCollection] = React.useState<Collection>("all");
    const timeOutList = [30, 45, 60, 90, 120];
    const [timeOut, setTimeout] = React.useState(timeOutList[0]);
    const [topicList] = React.useState(() => {
        const sampleProps: TopicProps[] = [];
        for (let i = 0; i < 8; i++) {
            sampleProps.push({...topicDefault, hidden: i > 4, id: i + ""});
        }
        return sampleProps;
    });
    const [crtCollection, setCrtCollection] = React.useState("");
    const isLogin = true;

    return (
        <Grid container sx={styles["roomPanel"]}>
            <Grid
                item
                container
                md={4}
                direction="column"
                sx={styles["container"]}
            >
                <Grid
                    item
                    container
                    alignItems="center"
                    sx={styles["settingRow"]}
                >
                    <Grid item md={2}>
                        <AccountCircleIcon color="primary" />
                    </Grid>
                    <Grid item md>
                        <Typography>Max User</Typography>
                    </Grid>
                    <Grid item md={4}>
                        <Select
                            value={maxUser}
                            onChange={e => setMaxUser(Number(e.target.value))}
                            sx={styles["selectCss"]}
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
                        <TimerIcon color="primary" />
                    </Grid>
                    <Grid item md>
                        <Typography>Timeout (sec)</Typography>
                    </Grid>
                    <Grid item md={4}>
                        <Select
                            value={timeOut}
                            onChange={e => setTimeout(Number(e.target.value))}
                            sx={styles["selectCss"]}
                        >
                            {timeOutList.map(time => {
                                return (
                                    <MenuItem value={time} key={time}>
                                        {time}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </Grid>
                </Grid>
                <Grid
                    item
                    sx={{marginTop: "auto"}}
                    container
                    justifyContent="center"
                >
                    <Button
                        startIcon={<ConstructionIcon />}
                        variant="contained"
                        disabled={crtCollection === ""}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
            <Grid item container md direction="column">
                <Grid
                    item
                    container={isLogin}
                    alignItems="center"
                    sx={{
                        ...styles["container"],
                        marginLeft: "15px",
                        width: "95%",
                    }}
                >
                    {!isLogin ? (
                        <Typography>
                            Select any topic below or <b>Sign in</b> to create
                            your own topic
                        </Typography>
                    ) : (
                        <>
                            <Grid item md={5}>
                                <Typography>Select one topic</Typography>
                            </Grid>
                            <Grid
                                item
                                container
                                md
                                justifyContent="space-evenly"
                            >
                                <Grid item md={5}>
                                    <Select
                                        sx={styles["selectCss"]}
                                        value={collection}
                                        onChange={e =>
                                            setCollection(
                                                e.target.value as Collection
                                            )
                                        }
                                    >
                                        <MenuItem value="all">All</MenuItem>
                                        <MenuItem value="your">
                                            Your topic
                                        </MenuItem>
                                        <MenuItem value="public">
                                            Public
                                        </MenuItem>
                                        <MenuItem value="official">
                                            Official
                                        </MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item>
                                    <Button
                                        startIcon={<AddIcon />}
                                        variant="contained"
                                        onClick={() => navigate("/collection")}
                                    >
                                        Create
                                    </Button>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Grid>
                <Grid
                    item
                    container
                    justifyContent="space-evenly"
                    sx={styles["collectionPanel"]}
                >
                    {topicList.map((p, idx) => {
                        return (
                            <TopicCard
                                {...p}
                                key={idx}
                                selected={crtCollection === p.id}
                                onClick={() => {
                                    setCrtCollection(
                                        crtCollection === p.id ? "" : p.id
                                    );
                                }}
                            />
                        );
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CreateRoom;
