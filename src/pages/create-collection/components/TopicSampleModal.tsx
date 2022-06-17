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

const TopicSampleModal = ({topic, onClose}: TopicSampleModalProps) => {
    return (
        <Grid
            container
            maxWidth="650px"
            className={clsx("flex-col rounded-xl", styles.centerModal)}
        >
            <div className="flex justify-center items-center">
                <Typography
                    variant="h4"
                    className="capitalize flex-1 text-center"
                >
                    {topic?.nameVi}
                </Typography>
                <IconButton onClick={onClose}>
                    <CancelPresentationIcon color="error" />
                </IconButton>
            </div>
            <SamplePanel topicId={topic?.id} />
        </Grid>
    );
};

export default TopicSampleModal;
