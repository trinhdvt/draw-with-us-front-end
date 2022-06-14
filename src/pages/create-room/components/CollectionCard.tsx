import React from "react";
import {Grid, GridProps, Typography} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import styles from "../../../assets/styles/Room.module.scss";
import clsx from "clsx";
import {ICollection, CollectionType} from "../../../@types/Collection";
import StyledAvatar from "../../../components/StyledAvatar";
import {FaPencilAlt} from "react-icons/fa";
import {RiImageEditFill} from "react-icons/ri";
import TopTooltip from "../../../components/TopTooltip";

const CollectionIcon = {
    [CollectionType.ALL]: CheckCircleIcon,
    [CollectionType.PUBLIC]: PublicIcon,
    [CollectionType.YOUR]: LockIcon,
    [CollectionType.OFFICIAL]: CheckCircleIcon,
};

const CollectionCard = ({
    name,
    numberOfTopics,
    playedCount,
    selected,
    thumbnail,
    type,
    ...others
}: ICollection & GridProps) => {
    const Icon = CollectionIcon[type];

    return (
        <Grid
            item
            container
            className={clsx(
                "flex-col items-center rounded-xl mx-1 mb-2 max-h-[141px]",
                styles.gameCollection,
                selected && styles.selected
            )}
            {...others}
        >
            <Grid item md>
                <StyledAvatar src={thumbnail} alt="topic_avatar" />
            </Grid>
            <Grid item md className="max-w-full mb-1 mt-1">
                <TopTooltip title={name}>
                    <Typography
                        variant="h5"
                        noWrap={true}
                        className="capitalize"
                    >
                        {name}
                    </Typography>
                </TopTooltip>
            </Grid>
            <Grid item md container className="mt-1">
                <div className="flex flex-col items-center flex-1">
                    <TopTooltip title="Played times">
                        <span>
                            <FaPencilAlt className="primary-icon" />
                        </span>
                    </TopTooltip>
                    <Typography variant="body2" className="font-medium">
                        {numberOfTopics ?? 10}
                    </Typography>
                </div>
                <div className="flex flex-col items-center flex-1">
                    <TopTooltip title="Privacy">
                        <span>
                            <Icon color="primary" />
                        </span>
                    </TopTooltip>
                    <Typography variant="body2" className="font-medium">
                        {CollectionType[type]}
                    </Typography>
                </div>
                <div className="flex flex-col items-center flex-1">
                    <TopTooltip title="Number of topics">
                        <span>
                            <RiImageEditFill className="primary-icon" />
                        </span>
                    </TopTooltip>
                    <Typography variant="body2" className="font-medium">
                        {playedCount ?? 49}
                    </Typography>
                </div>
            </Grid>
        </Grid>
    );
};

export default CollectionCard;
