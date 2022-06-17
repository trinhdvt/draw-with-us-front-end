import React from "react";
import {Grid, GridProps, Typography} from "@mui/material";
import clsx from "clsx";
import {IoHourglassOutline} from "react-icons/io5";
import {BiHash} from "react-icons/bi";
import {FaRegUser} from "react-icons/fa";

import styles from "../../../assets/styles/Room.module.scss";
import {IRoomResponse} from "../../../api/@types/Room";
import RandomAvatar from "../../../components/RandomAvatar";
import TopTooltip from "../../../components/TopTooltip";

interface RoomProps extends IRoomResponse {
    selected?: boolean;
}

const RoomCard = ({
    id,
    name,
    maxUsers,
    currentUsers,
    collectionName,
    timeOut,
    selected,
    onClick,
    ...others
}: RoomProps & GridProps) => {
    const isFull = maxUsers === currentUsers;
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
                <TopTooltip title={name}>
                    <span>
                        <RandomAvatar
                            size={50}
                            className="w-[50px] h-[50px]"
                            value={id}
                        />
                    </span>
                </TopTooltip>
            </Grid>

            <Grid item md className="max-w-full">
                <TopTooltip title="Game's collection">
                    <Typography
                        noWrap={true}
                        variant="h5"
                        className="text-xl capitalize mt-1"
                    >
                        {collectionName}
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
                            <IoHourglassOutline className="primary-icon" />
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
    maxUsers: 20,
    timeOut: 20,
    currentUsers: 10,
    id: Math.random().toString(18).slice(-8),
    eid: Math.random().toString(18).slice(-8),
    name: "fake-room",
    collectionName: "jonh doue",
    selected: false,
});

export default RoomCard;
export {RoomDefault};
export type {RoomProps};
