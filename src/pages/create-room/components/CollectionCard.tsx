import React from "react";
import {Grid, GridProps, Typography} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import styles from "../../../assets/styles/Room.module.scss";
import clsx from "clsx";
import {ICollection, CollectionType} from "../../../@types/Collection";
import StyledAvatar from "../../../components/StyledAvatar";

const CollectionIcon = {
    [CollectionType.ALL]: CheckCircleIcon,
    [CollectionType.PUBLIC]: PublicIcon,
    [CollectionType.YOUR]: LockIcon,
    [CollectionType.OFFICIAL]: CheckCircleIcon,
};

const CollectionCard = (props: ICollection & GridProps) => {
    const {name, thumbnail, type, selected, ...others} = props;
    const Icon = CollectionIcon[type];

    return (
        <Grid
            {...others}
            item
            container
            direction="column"
            alignItems="center"
            className={clsx(styles.gameCollection, selected && styles.selected)}
        >
            <StyledAvatar src={thumbnail} alt="topic_avatar" />
            <Typography variant="h5" className="mb-[5px] mt-[5px] capitalize">
                {name}
            </Typography>
            <Grid item container alignItems="center" justifyContent="center">
                <Typography variant="body2">{CollectionType[type]}</Typography>
                <Icon color="primary" />
            </Grid>
        </Grid>
    );
};

export default CollectionCard;
