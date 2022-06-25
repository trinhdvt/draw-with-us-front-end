import React from "react";
import {Button, Grid, MenuItem, Select, Typography} from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import {useNavigate} from "react-router-dom";
import {FaRegUser} from "react-icons/fa";
import {GiEmptyHourglass} from "react-icons/gi";
import clsx from "clsx";
import {MdOutlineDriveFileRenameOutline} from "react-icons/md";

import RoomLayout from "../../layout/RoomLayout";
import {useCreateRoom} from "../../api/services/RoomServices";
import styles from "../../assets/styles/Room.module.scss";
import {IRoomRequest} from "../../api/@types/Room";
import {notifyError} from "../../utils/Notify";
import TopTooltip from "../../components/TopTooltip";
import {useAppConfig} from "../../api/services/AppServices";
import CssTextField from "../../components/CssTextField";
import {useUser} from "../../store/UserStore";

import ListCollection from "./components/ListCollection";

const CreateRoom = () => {
    const {user} = useUser();
    const navigate = useNavigate();
    const [payload, setPayload] = React.useState<IRoomRequest>({
        maxUsers: 10,
        timeOut: 30,
        collectionId: "",
        name: user.name,
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
                timeOut: createConfig.timeOut[0],
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
    const tooltipText = isDisable ? "Please select a collection" : "";

    return (
        <RoomLayout title="Create Room">
            <Grid container className={styles.subContainer}>
                <Grid
                    item
                    md={4}
                    className={clsx("flex flex-col", styles.sidePanel)}
                >
                    <Grid
                        item
                        container
                        className="items-center justify-center mb-2.5"
                    >
                        <Grid item md={2}>
                            <MdOutlineDriveFileRenameOutline className="primary-icon" />
                        </Grid>
                        <Grid item md={3}>
                            <Typography>Name</Typography>
                        </Grid>
                        <Grid item md>
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
                        </Grid>
                    </Grid>
                    <Grid item container className="items-center mb-2.5">
                        <Grid item md={2}>
                            <FaRegUser className="primary-icon" />
                        </Grid>
                        <Grid item md>
                            <Typography>Max User</Typography>
                        </Grid>
                        <Grid item md={4}>
                            <Select
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
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid item container alignItems="center">
                        <Grid item md={2}>
                            <GiEmptyHourglass className="primary-icon" />
                        </Grid>
                        <Grid item md>
                            <Typography>Timeout (sec)</Typography>
                        </Grid>
                        <Grid item md={4}>
                            <Select
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
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid item container className="justify-center mt-auto">
                        <TopTooltip title={tooltipText}>
                            <span>
                                <Button
                                    startIcon={<ConstructionIcon />}
                                    variant="contained"
                                    disabled={isDisable}
                                    onClick={createRoom}
                                >
                                    Create
                                </Button>
                            </span>
                        </TopTooltip>
                    </Grid>
                </Grid>
                <ListCollection onCollectionSelect={onSelect} />
            </Grid>
        </RoomLayout>
    );
};

export default CreateRoom;
