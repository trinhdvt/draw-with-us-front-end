import React from "react";
import {Avatar, Button, Divider, Grid, Typography} from "@mui/material";
import {FaRegUser} from "react-icons/fa";
import {GiEmptyHourglass} from "react-icons/gi";
import clsx from "clsx";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LogoutIcon from "@mui/icons-material/Logout";
import {Navigate, useNavigate, useSearchParams} from "react-router-dom";

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
            <RoomLayout title="Join Room">
                <Grid container className={styles.joinRoomMain}>
                    <Grid
                        item
                        container
                        md={5.7}
                        xs={5.7}
                        direction="column"
                        className={clsx(
                            styles.subPanel,
                            "items-center mx-auto"
                        )}
                    >
                        <Typography
                            variant="h3"
                            className="uppercase mt-[15px] mb-3"
                        >
                            Your information
                        </Typography>
                        <UserInfo />
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid
                        item
                        container
                        md={5.7}
                        xs={5.7}
                        direction="column"
                        className={clsx(
                            styles.subPanel,
                            "items-center mx-auto"
                        )}
                    >
                        <Typography variant="h3" className="uppercase my-auto">
                            Room Information
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
                                        Room Master
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
                                    <MeetingRoomIcon
                                        color="primary"
                                        fontSize="large"
                                    />
                                </div>
                                <RoomInfoDiv>
                                    <Typography className="capitalize">
                                        Room&lsquo;s name
                                    </Typography>
                                    <TopTooltip title={data?.name ?? ""}>
                                        <span>
                                            <TextContent>
                                                {data?.name}
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
                                        Nums of Players
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
                                        Time per turn
                                    </Typography>
                                    <TextContent>{data?.timeOut}s</TextContent>
                                </RoomInfoDiv>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Grid container className="justify-center mt-4">
                    <Grid item md={2} xs={2}>
                        <Button
                            variant="contained"
                            startIcon={<SportsEsportsIcon />}
                            fullWidth
                            onClick={onJoinRoom}
                        >
                            Join Now
                        </Button>
                    </Grid>
                    <div className="mx-2"></div>
                    <Grid item md={2} xs={2}>
                        <Button
                            variant="outlined"
                            startIcon={<LogoutIcon />}
                            color="error"
                            fullWidth
                            onClick={() => navigate("/", {replace: true})}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </RoomLayout>
        </AppLayout>
    );
};

export default JoinRoom;
