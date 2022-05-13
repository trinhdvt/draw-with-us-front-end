import React from "react";
import {Avatar, Grid, Typography} from "@mui/material";
import sampleImg from "../../assets/images/avatar.png";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import styles from "./styles/Room.module.scss";
import clsx from "clsx";

interface CollectionProps extends React.HTMLAttributes<HTMLElement> {
    hidden?: boolean;
    selected?: boolean;
    thumbnail: string;
    name: string;
    type: string;
    id: string;
}

const CollectionCard = (props: CollectionProps) => {
    return (
        <Grid
            {...props}
            item
            md={2.5}
            container
            direction="column"
            alignItems="center"
            className={clsx(
                styles.gameCollection,
                props.selected && styles.selected
            )}
        >
            <Grid item>
                <Avatar src={props.thumbnail} alt="topic_avatar" />
            </Grid>
            <Grid item className="mb-[10px]">
                <Typography>{props.name}</Typography>
            </Grid>
            <Grid item container alignItems="center" justifyContent="center">
                <Typography>{props.type}</Typography>
                <CheckCircleOutlineIcon color="primary" />
            </Grid>
        </Grid>
    );
};

const collectionDefault: CollectionProps = {
    thumbnail: sampleImg,
    name: "Easy",
    type: "Default",
    hidden: false,
    selected: false,
    id: "",
};

export default CollectionCard;
export {collectionDefault};
export type {CollectionProps};
