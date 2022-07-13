import React from "react";
import clsx from "clsx";
import {Grid, IconButton, Typography} from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import styles from "../../../assets/styles/Collection.module.scss";
import ITopic from "../../../api/@types/Topic";
import SamplePanel from "../../gallery/components/SamplePanel";

type TopicSampleModalProps = {
    topic: ITopic | null;
    onClose: () => void;
};

const TopicSampleModal = ({topic, onClose}: TopicSampleModalProps) => (
    <div className="modal">
        <Grid
            maxWidth="650px"
            className={clsx("flex flex-col rounded-xl", styles.centerModal)}
        >
            <div className="grid grid-cols-[1fr_11fr_1fr] items-center">
                <div />
                <Typography variant="h3" className="capitalize text-center">
                    {topic?.name}
                </Typography>
                <IconButton onClick={onClose}>
                    <CancelPresentationIcon color="error" />
                </IconButton>
            </div>
            <SamplePanel topicId={topic?.id} />
        </Grid>
    </div>
);

export default TopicSampleModal;
