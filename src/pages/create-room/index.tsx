import React from "react";
import {Button, Grid, MenuItem, Select, Typography} from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import {useNavigate} from "react-router-dom";
import {IoHourglassOutline} from "react-icons/io5";
import {FaRegUser} from "react-icons/fa";

import RoomLayout from "../../layout/RoomLayout";
import {useCreateRoom} from "../../api/services/RoomServices";
import styles from "../../assets/styles/Room.module.scss";
import {IRoomRequest} from "../../api/@types/Room";
import {notifyError} from "../../utils/Notify";
import TopTooltip from "../../components/TopTooltip";

import ListCollection from "./components/ListCollection";

const CreateRoom = () => {
    const maxUserList = [10, 15, 30, 50];
    const timeOutList = [20, 45, 60, 90, 120];

    const navigate = useNavigate();
    const [payload, setPayload] = React.useState<IRoomRequest>({
        maxUsers: maxUserList[0],
        timeOut: timeOutList[0],
        collectionId: "",
    });
    const [isDisable, setDisableCreate] = React.useState(true);
    const {mutate} = useCreateRoom();

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
                    container
                    md={4}
                    direction="column"
                    className={styles.sidePanel}
                >
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
                                {maxUserList.map(m => (
                                    <MenuItem key={m} value={m}>
                                        {m}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid item container alignItems="center">
                        <Grid item md={2}>
                            <IoHourglassOutline className="primary-icon" />
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
                                {timeOutList.map(time => (
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
                <Grid item container md={7.8} className="flex-col ml-auto">
                    <ListCollection onSelect={onSelect} />
                </Grid>
            </Grid>
        </RoomLayout>
    );
};

export default CreateRoom;
