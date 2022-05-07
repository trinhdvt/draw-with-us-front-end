import React from "react";
import {Avatar, Grid, Typography} from "@mui/material";
import sampleImg from "../../assets/images/avatar.png";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {makeStyles} from "@mui/styles";
import clsx from "clsx";

const useStyles = makeStyles({
    roomContainer: {
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "10px",
    },
    gameTopic: {
        border: "5px solid #fff",
        borderRadius: "5px",
        marginBottom: "10px",
        backgroundColor: "#fff",
        "&:hover": {
            borderColor: "rgba(0,121,255,.7)",
        },
    },
    selected: {
        borderColor: "rgba(0,121,255,.7)",
    },
});

interface TopicProps extends React.HTMLAttributes<HTMLElement> {
    hidden?: boolean;
    selected?: boolean;
    thumbnail: string;
    name: string;
    type: string;
    id: string;
}

const TopicCard = (props: TopicProps) => {
    const classes = useStyles();

    return (
        <Grid
            {...props}
            item
            md={2.5}
            container
            direction="column"
            className={clsx(
                classes.gameTopic,
                props.selected && classes.selected
            )}
            alignItems="center"
        >
            <Grid item>
                <Avatar src={props.thumbnail} alt="topic_avatar" />
            </Grid>
            <Grid item sx={{marginBottom: "10px"}}>
                <Typography>{props.name}</Typography>
            </Grid>
            <Grid item container alignItems="center" justifyContent="center">
                <Typography>{props.type}</Typography>
                <CheckCircleOutlineIcon color="primary" />
            </Grid>
        </Grid>
    );
};

const topicDefault: TopicProps = {
    thumbnail: sampleImg,
    name: "Easy",
    type: "Default",
    hidden: false,
    selected: false,
    id: "",
};

export default TopicCard;
export {topicDefault};
export type {TopicProps};
