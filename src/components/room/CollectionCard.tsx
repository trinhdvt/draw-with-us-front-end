import React from "react";
import {Avatar, Grid, Typography} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import styles from "./styles/Room.module.scss";
import clsx from "clsx";
import {CollectionProps} from "../../models/Collection";

const CollectionCard = (
    props: CollectionProps & React.HTMLAttributes<HTMLElement>
) => {
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
                props.selected && styles.selected,
                props.hidden && "invisible"
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

export default CollectionCard;
