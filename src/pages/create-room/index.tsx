import React from "react";
import {Button, Grid, MenuItem, Typography} from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import {useNavigate} from "react-router-dom";
import {FaRegUser} from "react-icons/fa";
import {GiEmptyHourglass} from "react-icons/gi";
import clsx from "clsx";
import {MdOutlineDriveFileRenameOutline} from "react-icons/md";
import {VscShield} from "react-icons/vsc";
import {useTranslation} from "react-i18next";

import RoomLayout from "../../layout/RoomLayout";
import {useCreateRoom} from "../../api/services/RoomServices";
import styles from "../../assets/styles/Room.module.scss";
import {IRoomRequest} from "../../api/@types/Room";
import {notifyError} from "../../utils/Notify";
import TopTooltip from "../../components/TopTooltip";
import {useAppConfig} from "../../api/services/AppServices";
import CssTextField from "../../components/CssTextField";
import {useUser} from "../../store/UserStore";
import PasswordField from "../../components/PasswordField";
import CssSelect from "../../components/CssSelect";

import ListCollection from "./components/ListCollection";

const CreateRoom = () => {
    const {t} = useTranslation();
    const {user, token} = useUser();
    const isLoggedIn = !!token;
    const navigate = useNavigate();
    const [payload, setPayload] = React.useState<IRoomRequest>({
        maxUsers: 10,
        timeOut: 30,
        collectionId: "",
        name: user.name,
        password: "",
    });
    const [isDisable, setDisableCreate] = React.useState(true);
    const {data} = useAppConfig();
    const createConfig = data?.room;
    const {mutate} = useCreateRoom();

    React.useEffect(() => {
        if (createConfig) {
            setPayload(prev => ({
                ...prev,
                maxUsers: createConfig.maxUsers[0],
                timeOut: createConfig.timeOut[1],
            }));
        }
    }, [createConfig]);

    const createRoom = () => {
        mutate(payload, {
            onSuccess: data => navigate(`/play/${data.id}`, {replace: true}),
            onError: async err => await notifyError(err.response?.data.message),
        });
    };

    const onSelect = (collectionId: string) => {
        setPayload({...payload, collectionId});
        setDisableCreate(false);
    };
    const tooltipText = isDisable ? t("create_room.create_disable") : "";

    return (
        <RoomLayout title={t("create_room.title")}>
            <Grid
                className={clsx(
                    styles.subContainer,
                    "grid grid-cols-[1fr_2fr] gap-x-2"
                )}
            >
                <Grid
                    className={clsx(
                        "w-full grid grid-rows-6",
                        styles.sidePanel
                    )}
                >
                    <div className="grid grid-cols-[auto_1fr_2fr] items-center">
                        <MdOutlineDriveFileRenameOutline className="primary-icon mr-1" />
                        <Typography className="mr-1">
                            {t("create_room.name")}
                        </Typography>
                        <CssTextField
                            value={payload.name}
                            onChange={e =>
                                setPayload({
                                    ...payload,
                                    name: e.target.value,
                                })
                            }
                            placeholder={user.name}
                            autoComplete="off"
                            size="small"
                        />
                    </div>
                    <div className="grid grid-cols-[auto_2fr_1fr] items-center">
                        <FaRegUser className="primary-icon mr-1" />
                        <Typography>{t("create_room.max_player")}</Typography>
                        <CssSelect
                            value={payload.maxUsers}
                            className={styles.selectBox}
                            onChange={e => {
                                const value = Number(e.target.value);
                                setPayload({...payload, maxUsers: value});
                            }}
                        >
                            {createConfig?.maxUsers?.map(m => (
                                <MenuItem key={m} value={m}>
                                    {m}
                                </MenuItem>
                            ))}
                        </CssSelect>
                    </div>
                    <div className="grid grid-cols-[auto_2fr_1fr] items-center">
                        <GiEmptyHourglass className="primary-icon mr-1" />
                        <Typography>{t("create_room.time_out")}</Typography>
                        <CssSelect
                            value={payload.timeOut}
                            className={styles.selectBox}
                            onChange={e => {
                                const value = Number(e.target.value);
                                setPayload({...payload, timeOut: value});
                            }}
                        >
                            {createConfig?.timeOut?.map(time => (
                                <MenuItem value={time} key={time}>
                                    {time}
                                </MenuItem>
                            ))}
                        </CssSelect>
                    </div>
                    {isLoggedIn && (
                        <div className="grid grid-cols-[auto_auto_2fr] items-center">
                            <VscShield className="primary-icon text-red-700 mr-1" />
                            <TopTooltip
                                title={t("create_room.password_tooltip")}
                            >
                                <Typography className="mr-1">
                                    {t("create_room.password")}
                                </Typography>
                            </TopTooltip>
                            <PasswordField
                                value={payload.password}
                                onChange={e =>
                                    setPayload({
                                        ...payload,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>
                    )}
                    <div className="w-full row-[5/7] flex justify-center mt-auto">
                        <TopTooltip title={tooltipText}>
                            <span>
                                <Button
                                    startIcon={<ConstructionIcon />}
                                    variant="contained"
                                    disabled={isDisable}
                                    onClick={createRoom}
                                >
                                    {t("create_room.create")}
                                </Button>
                            </span>
                        </TopTooltip>
                    </div>
                </Grid>
                <ListCollection onCollectionSelect={onSelect} />
            </Grid>
        </RoomLayout>
    );
};

export default CreateRoom;
