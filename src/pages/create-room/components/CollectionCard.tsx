import React from "react";
import {Grid, GridProps, Typography} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {RiImageEditFill} from "react-icons/ri";
import clsx from "clsx";
import {useTranslation} from "react-i18next";

import styles from "../../../assets/styles/Room.module.scss";
import {ICollection, CollectionType} from "../../../api/@types/Collection";
import StyledAvatar from "../../../components/StyledAvatar";
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
    const {t} = useTranslation();
    const Icon = CollectionIcon[type];

    return (
        <Grid
            item
            className={clsx(
                "grid auto-rows-auto max-h-[136px] items-center cursor-pointer rounded-xl",
                styles.gameCollection,
                selected && styles.selected
            )}
            {...others}
        >
            <div className="flex justify-center">
                <StyledAvatar src={thumbnail} alt="topic_avatar" />
            </div>
            <div className="max-w-[160px] text-center my-1">
                <TopTooltip title={name}>
                    <Typography
                        variant="h5"
                        noWrap={true}
                        className="capitalize"
                    >
                        {name}
                    </Typography>
                </TopTooltip>
            </div>
            <div className="w-full grid grid-cols-3 ">
                <div className="flex flex-col items-center flex-1">
                    <TopTooltip title={t("create_room.played_times")}>
                        <span>
                            <VisibilityIcon color="primary" />
                        </span>
                    </TopTooltip>
                    <Typography variant="body2" className="font-medium">
                        {playedCount}
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
                    <TopTooltip title={t("create_room.number_of_topics")}>
                        <span>
                            <RiImageEditFill className="primary-icon" />
                        </span>
                    </TopTooltip>
                    <Typography variant="body2" className="font-medium">
                        {numberOfTopics}
                    </Typography>
                </div>
            </div>
        </Grid>
    );
};

export default CollectionCard;
