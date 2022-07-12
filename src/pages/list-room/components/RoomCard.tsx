import React from "react";
import {Avatar, Grid, GridProps, Typography} from "@mui/material";
import clsx from "clsx";
import {BiHash} from "react-icons/bi";
import {FaRegUser} from "react-icons/fa";
import {GiEmptyHourglass} from "react-icons/gi";
import {FcPrivacy} from "react-icons/fc";
import {useTranslation} from "react-i18next";

import styles from "../../../assets/styles/Room.module.scss";
import {IRoomResponse} from "../../../api/@types/Room";
import RandomAvatar from "../../../components/RandomAvatar";
import TopTooltip from "../../../components/TopTooltip";
import {ShowMode, useRoomStore} from "../store/RoomStore";

interface RoomProps extends IRoomResponse {
    selected?: boolean;
}

const RoomCard = ({
    id,
    name,
    collectionName,
    maxUsers,
    currentUsers,
    timeOut,
    selected,
    image,
    isPrivate,
    onClick,
    ...others
}: RoomProps & GridProps) => {
    const {t} = useTranslation();
    const isFull = maxUsers === currentUsers;
    const showMode = useRoomStore(state => state.roomShowMode);
    const roomLabel = showMode === ShowMode.ROOM_NAME ? name : collectionName;
    const tooltip = isFull ? t("list_room.room_full") : "";

    return (
        <TopTooltip title={tooltip}>
            <Grid
                item
                className={clsx(
                    styles.gameRoom,
                    selected && styles.selected,
                    isFull && "hover:cursor-not-allowed",
                    "grid max-w-full max-h-[161px] auto-rows-auto rounded-xl cursor-pointer"
                )}
                onClick={isFull ? undefined : onClick}
                {...others}
            >
                <div className="flex justify-center items-center relative">
                    {image ? (
                        <Avatar className="w-[51px] h-[51px]" src={image} />
                    ) : (
                        <RandomAvatar
                            size={45}
                            className="w-[45px] h-[45px]"
                            value={id}
                        />
                    )}
                    {isPrivate && (
                        <TopTooltip title={t("list_room.tooltip.private_room")}>
                            <span className="absolute top-[70%] left-[43%] rounded-xl bg-[rgba(255,255,255,0.8)] ">
                                <FcPrivacy className="primary-icon text-red-500" />
                            </span>
                        </TopTooltip>
                    )}
                </div>
                <div className="text-center max-w-[190px]">
                    <TopTooltip title={roomLabel}>
                        <Typography
                            noWrap={true}
                            variant="h5"
                            className="ml-1 capitalize mt-2"
                        >
                            {roomLabel}
                        </Typography>
                    </TopTooltip>
                </div>
                <div className="grid grid-cols-4 w-full mt-1">
                    <div className="flex flex-col  items-center ">
                        <TopTooltip title={t("list_room.tooltip.max_player")}>
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
                    <div className="flex flex-col col-span-2 items-center">
                        <TopTooltip title={t("list_room.tooltip.room_id")}>
                            <span>
                                <BiHash className="primary-icon" />
                            </span>
                        </TopTooltip>
                        <Typography variant="body1" className="font-light">
                            {id}
                        </Typography>
                    </div>
                    <div className="flex flex-col items-center">
                        <TopTooltip title={t("list_room.tooltip.time_out")}>
                            <span>
                                <GiEmptyHourglass className="primary-icon" />
                            </span>
                        </TopTooltip>
                        <Typography variant="body1" className="font-light">
                            {timeOut}s
                        </Typography>
                    </div>
                </div>
            </Grid>
        </TopTooltip>
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
    isPrivate: Math.random() > 0.5,
});

export default RoomCard;
export {RoomDefault};
export type {RoomProps};
