import React from "react";
import {Avatar, Button, Divider, Grid, Typography} from "@mui/material";
import {FaRegUser} from "react-icons/fa";
import {GiEmptyHourglass} from "react-icons/gi";
import {MdOutlineCollections} from "react-icons/md";
import clsx from "clsx";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LogoutIcon from "@mui/icons-material/Logout";
import {Navigate, useNavigate, useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import RoomLayout from "../../layout/RoomLayout";
import styles from "../../assets/styles/Room.module.scss";
import UserInfo from "../home/components/UserInfo";
import {usePreviewRoom} from "../../api/services/RoomServices";
import {AnimatedLoading} from "../../components/LoadingScreen";
import AppLayout from "../../layout/AppLayout";
import useJoinRoom from "../list-room/hooks/useJoinRoom";
import TopTooltip from "../../components/TopTooltip";

const TextContent = ({children}: {children: React.ReactNode}) => (
    <Typography
        noWrap={true}
        variant="body1"
        className="w-[120px] font-medium text-center"
    >
        {children}
    </Typography>
);

const RoomInfoDiv = ({children}: {children: React.ReactNode}) => (
    <div className="ml-1 grid grid-rows-2 justify-items-center">{children}</div>
);

const JoinRoom = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const roomId = searchParams.get("rid");
    const {data, isError, isFetching} = usePreviewRoom(roomId);
    const {joinRoom} = useJoinRoom();

    if (!roomId || isError) return <Navigate to="/" replace={true} />;
    if (isFetching) return <AnimatedLoading />;

    const onJoinRoom = async () => {
        if (!data) return;

        const {isPrivate, eid} = data;
        await joinRoom({eid, isPrivate: !!isPrivate});
    };

    return (
        <AppLayout>
            <RoomLayout title={t("join_room.title")}>
                <div className={styles.joinRoomMain}>
                    <div className={styles.subPanel}>
                        <Typography
                            variant="h3"
                            className="uppercase mt-5 mb-3"
                        >
                            {t("join_room.your_info")}
                        </Typography>
                        <UserInfo />
                    </div>
                    <Divider orientation="vertical" flexItem className="mx-2" />
                    <div className={styles.subPanel}>
                        <Typography variant="h3" className="uppercase my-auto">
                            {t("join_room.room_info")}
                        </Typography>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-8 my-auto">
                            <div className="flex items-center">
                                <Avatar
                                    src={data?.host.avatar}
                                    className={clsx(
                                        "w-[52px] h-[52px]",
                                        styles.avatarBorder
                                    )}
                                />
                                <RoomInfoDiv>
                                    <Typography className="capitalize">
                                        {t("join_room.room_master")}
                                    </Typography>
                                    <TopTooltip title={data?.host.name ?? ""}>
                                        <span>
                                            <TextContent>
                                                {data?.host.name}
                                            </TextContent>
                                        </span>
                                    </TopTooltip>
                                </RoomInfoDiv>
                            </div>
                            <div className="flex items-center">
                                <div className={styles.iconAvatar}>
                                    <MdOutlineCollections className="primary-icon text-3xl" />
                                </div>
                                <RoomInfoDiv>
                                    <Typography className="capitalize">
                                        {t("join_room.room_collection")}
                                    </Typography>
                                    <TopTooltip
                                        title={data?.collectionName ?? ""}
                                    >
                                        <span>
                                            <TextContent>
                                                {data?.collectionName}
                                            </TextContent>
                                        </span>
                                    </TopTooltip>
                                </RoomInfoDiv>
                            </div>
                            <div className="flex items-center">
                                <div className={styles.iconAvatar}>
                                    <FaRegUser className="primary-icon text-3xl" />
                                </div>
                                <RoomInfoDiv>
                                    <Typography className="capitalize">
                                        {t("join_room.max_player")}
                                    </Typography>
                                    <TextContent>{`${data?.currentUsers}/${data?.maxUsers}`}</TextContent>
                                </RoomInfoDiv>
                            </div>
                            <div className="flex items-center">
                                <div className={styles.iconAvatar}>
                                    <GiEmptyHourglass className="primary-icon text-3xl" />
                                </div>
                                <RoomInfoDiv>
                                    <Typography className="capitalize">
                                        {t("join_room.timeout")}
                                    </Typography>
                                    <TextContent>{data?.timeOut}s</TextContent>
                                </RoomInfoDiv>
                            </div>
                        </div>
                    </div>
                </div>
                <Grid container className="justify-center mt-4">
                    <Grid item md={2} xs={2}>
                        <Button
                            variant="contained"
                            startIcon={<SportsEsportsIcon />}
                            fullWidth
                            onClick={onJoinRoom}
                        >
                            {t("join_room.join_now")}
                        </Button>
                    </Grid>
                    <div className="mx-2" />
                    <Grid item md={2} xs={2}>
                        <Button
                            variant="outlined"
                            startIcon={<LogoutIcon />}
                            color="error"
                            fullWidth
                            onClick={() => navigate("/", {replace: true})}
                        >
                            {t("join_room.cancel")}
                        </Button>
                    </Grid>
                </Grid>
            </RoomLayout>
        </AppLayout>
    );
};

export {RoomInfoDiv, TextContent};
export default JoinRoom;
