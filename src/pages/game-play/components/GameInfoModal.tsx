import React from "react";
import {Avatar, Divider, Grid, IconButton, Typography} from "@mui/material";
import clsx from "clsx";
import {FaRegUser} from "react-icons/fa";
import {GiEmptyHourglass} from "react-icons/gi";
import {MdOutlineCollections} from "react-icons/md";
import {Trans, useTranslation} from "react-i18next";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import gameStyles from "../../../assets/styles/Game.module.scss";
import {usePreviewRoom} from "../../../api/services/RoomServices";
import styles from "../../../assets/styles/Room.module.scss";
import TopTooltip from "../../../components/TopTooltip";
import {RoomInfoDiv, TextContent} from "../../join-room";
import {useGame} from "../context/GameContext";

type Props = {
    onClose: () => void;
};

const GameInfoModal = ({onClose}: Props) => {
    const {t} = useTranslation();
    const {gameState} = useGame();
    const roomId = gameState.roomId as string;
    const {data} = usePreviewRoom(roomId);

    return (
        <div className="modal">
            <Grid
                maxWidth="sm"
                className={clsx(
                    "flex flex-col  items-center rounded-xl",
                    gameStyles.centerModal
                )}
            >
                <div className="w-full grid grid-cols-[1fr_11fr_1fr]  mb-2">
                    <div />
                    <Typography
                        variant="h3"
                        className="uppercase my-auto text-center"
                    >
                        {t("join_room.room_info")}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CancelPresentationIcon color="error" />
                    </IconButton>
                </div>
                <div className=" grid grid-cols-2 gap-x-2 gap-y-4 my-auto">
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
                                    <TextContent>{data?.host.name}</TextContent>
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
                            <TopTooltip title={data?.collectionName ?? ""}>
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
                <Divider orientation="horizontal" flexItem className="mt-4" />
                <ul>
                    <li>
                        <Typography>
                            <Trans
                                values={{
                                    roomName: data?.name,
                                    collectionName: data?.collectionName,
                                }}
                            >
                                how_to_play.room_preview
                            </Trans>
                        </Typography>
                    </li>
                    <li>
                        <Typography>
                            <Trans
                                values={{
                                    topicCount: data?.numberOfTopics,
                                }}
                            >
                                how_to_play.number_of_topics
                            </Trans>
                        </Typography>
                    </li>
                    <li>
                        <Typography>
                            <Trans
                                values={{
                                    timeOut: data?.timeOut,
                                }}
                            >
                                how_to_play.timeout_warn
                            </Trans>
                        </Typography>
                    </li>
                    <li>
                        <Typography>
                            <Trans>how_to_play.how_to_check</Trans>
                        </Typography>
                    </li>
                    <li>
                        <Typography>
                            <Trans>how_to_play.view_history</Trans>
                        </Typography>
                    </li>
                </ul>
            </Grid>
        </div>
    );
};

export default GameInfoModal;
