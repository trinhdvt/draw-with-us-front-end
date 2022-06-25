import React from "react";
import {Avatar, Grid, GridProps, Typography} from "@mui/material";
import clsx from "clsx";
import {BiHash} from "react-icons/bi";
import {FaRegUser} from "react-icons/fa";
import {GiEmptyHourglass} from "react-icons/gi";

import styles from "../../../assets/styles/Room.module.scss";
import {IRoomResponse} from "../../../api/@types/Room";
import RandomAvatar from "../../../components/RandomAvatar";
import TopTooltip from "../../../components/TopTooltip";
import {ShowMode} from "../index";

interface RoomProps extends IRoomResponse {
    selected?: boolean;
    showMode?: ShowMode;
}

const RoomCard = ({
    id,
    name,
    collectionName,
    showMode,
    maxUsers,
    currentUsers,
    timeOut,
    selected,
    image,
    onClick,
    ...others
}: RoomProps & GridProps) => {
    const isFull = maxUsers === currentUsers;
    const roomLabel = showMode == ShowMode.ROOM_NAME ? name : collectionName;

    return (
        <Grid
            item
            container
            className={clsx(
                styles.gameRoom,
                selected && styles.selected,
                isFull && "hover:cursor-not-allowed",
                "flex-col items-center rounded-xl mb-2 ml-2 cursor-pointer"
            )}
            onClick={isFull ? undefined : onClick}
            {...others}
        >
            <Grid item md>
                {image ? (
                    <Avatar className="w-[45px] h-[45px]" src,={image} />
                ) : (
                    <RandomAvatar
                        size={45}
                        className="w-[45px] h-[45px]"
                        value={id}
                    />
                )}
            </Grid>
            <Grid item md className="pr-1 max-w-full">
                <TopTooltip title={roomLabel}>
                    <Typography
                        noWrap={true}
                        variant="h5"
                        className="ml-1 capitalize mt-1"
                    >
                        {roomLabel}
                    </Typography>
                </TopTooltip>
            </Grid>
            <Grid item container className="mt-2">
                <div className="flex flex-col justify-center items-center flex-1">
                    <TopTooltip title="Max players">
                        <span>
                            <FaRegUser
                                className={clsx(
                                    "primary-icon",
                                    isFull && "text-red-500"
                                )}
                            />
                        </span>
                    </TopTooltip>
                    <Typography variant="body1" className="font-light">
                        {currentUsers}/{maxUsers}
                    </Typography>
                </div>
                <div className="flex flex-col justify-center items-center flex-1">
                    <TopTooltip title="Room's ID">
                        <span>
                            <BiHash className="primary-icon" />
                        </span>
                    </TopTooltip>
                    <Typography variant="body1" className="font-light">
                        {id}
                    </Typography>
                </div>
                <div className="flex flex-col justify-center items-center flex-1">
                    <TopTooltip title="Timeout per turn">
                        <span>
                            <GiEmptyHourglass className="primary-icon" />
                        </span>
                    </TopTooltip>
                    <Typography variant="body1" className="font-light">
                        {timeOut}s
                    </Typography>
                </div>
            </Grid>
        </Grid>
    );
};

const RoomDefault = (): RoomProps => ({
    maxUsers: 10,
    timeOut: 20,
    currentUsers: 10,
    id: Math.random().toString(18).slice(-8),
    eid: Math.random().toString(18).slice(-8),
    name: "fake-room",
    collectionName: "Demo",
    selected: false,
});

export default RoomCard;
export {RoomDefault};
export type {RoomProps};
